require("promise");
const fs = require("fs").promises;
const fs_sync = require("fs");
const archiver = require("archiver");
const xpath = require("xpath");
const dom = require("xmldom").DOMParser;
const request = require("request");

// Config file is JSON format:
//
// {
//   "webappname": "YourAzureWebAppName",
//   "resourceGroup": "YourAzureWebAppResourceGroup",
//   "location": "YourAzureWebAppLocation (eg Central US)",
// }

const configFile = "./config.json";
const tempFolder = "./temp";
const buildFolder = "../build";
const zipFileName = "package.zip";
const zipFilePath = tempFolder + "/" + zipFileName;
const publishSettingsFilePath = "./publishsettings.xml";

process();

async function process() {
  const config = await readConfigFile();
  await prepareTempFolder();
  await createZipFile();
  const publishData = await readPublishSettingsFile();
  await deployPackage(config, publishData);
  await cleanupTempFolder();
  log("Done!");
}

async function readConfigFile() {
  log("Reading config file");
  let rawdata = await fs.readFile(configFile);
  return JSON.parse(rawdata);
}

async function prepareTempFolder() {
  log("Preparing temp folder");
  // Create temp folder if it does not already exist
  if (!fs_sync.existsSync(tempFolder)) {
    await fs.mkdir(tempFolder);
  }

  // Remove temp zip file if it already exists
  if (fs_sync.existsSync(zipFilePath)) {
    await fs.unlink(zipFilePath);
  }
}

async function cleanupTempFolder() {
  log("Cleaning up temp folder");
  // Remove temp zip file if it already exists
  if (fs_sync.existsSync(zipFilePath)) {
    await fs.unlink(zipFilePath);
  }

  // Remove temp folder if it does not already exist
  if (fs_sync.existsSync(tempFolder)) {
    await fs.rmdir(tempFolder);
  }
}

function createZipFile() {
  log("Creating zip file");
  var output = fs_sync.createWriteStream(zipFilePath);
  var archive = archiver("zip", { zlib: { level: 9 } });

  return new Promise(function(resolve, reject) {
    archive
      .directory(buildFolder, false)
      .on("error", err => reject(err))
      .pipe(output);

    output.on("close", () => resolve());
    archive.finalize();
  });
}

async function readPublishSettingsFile() {
  log("Reading publish settings file");
  const xml = await fs.readFile(publishSettingsFilePath, { encoding: "UTF8" });
  const doc = new dom().parseFromString(xml);

  const extract = node => {
    return xpath.select(
      '//publishProfile[@publishMethod="MSDeploy"]/@' + node,
      doc
    )[0].nodeValue;
  };

  return {
    username: extract("userName"),
    password: extract("userPWD"),
    url: extract("publishUrl"),
    siteName: extract("msdeploySite")
  };
}

async function deployPackage(config, publishData) {
  log("Deploying package to Azure");
  // From https://github.com/projectkudu/kudu/wiki/Deploying-from-a-zip-file
  // curl -X POST -u <user> --data-binary @<zipfile> https://{sitename}.scm.azurewebsites.net/api/zipdeploy
  // $curlArguments =
  //     '-X ' +
  //     'POST ' +
  //     '-u ' + $username + ':' + $password + ' ' +
  //     '--data-binary @' + $package + ' ' +
  //     'https://' + $siteName + '.scm.azurewebsites.net/api/zipdeploy'

  const { username, password } = publishData;
  const url =
    "https://" + publishData.siteName + ".scm.azurewebsites.net/api/zipdeploy";

  return new Promise(function(resolve, reject) {
    request.post(
      {
        uri: url,
        auth: {
          user: username,
          pass: password
        },
        body: fs_sync.createReadStream(zipFilePath)
      },
      function(err, resp, body) {
        if (err) {
          reject(err);
        } else if (resp.statusCode === 200) {
          resolve(body);
        } else {
          // Error status code
          reject(Error("Status code " + resp.statusCode + ": " + body));
        }
      }
    );
  });
}

function log(message) {
  console.log(message);
}
