# Deployment using Kudu

Instructions from: https://github.com/projectkudu/kudu/wiki/Deploying-from-a-zip-file

To deploy the content of a zip file to your site, POST the zip to /api/zipdeploy.

Using curl:

curl -X POST -u <user> --data-binary @<zipfile> https://{sitename}.scm.azurewebsites.net/api/zipdeploy

zipdeploy is intended for fast and easy deployments from development environments, as well as deployment of ready-to-run sites built by continuous integration services such as Visual Studio Team Services. Unlike other Kudu deployment mechanisms, Kudu assumes by default that deployments from zip files are ready to run and do not require additional build steps during deployment, such as npm install or dotnet restore/dotnet publish

## Notes

The build script expects a publishsettings.xml file to be present in the `deploy` folder. Because this file contains senstivie data it should never be checked into source control, and hence is masked from Git.
