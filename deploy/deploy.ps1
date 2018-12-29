# Read config file to get Azure resource group and app name, etc
#
# File is JSON format:
#
# {
#   "webappname": "YourAzureWebAppName",
#   "resourceGroup": "YourAzureWebAppResourceGroup",
#   "location": "YourAzureWebAppLocation (eg Central US)",
# }
#
$configFile = $PSScriptRoot + "/config.json"
$json = Get-Content $configFile | Out-String | ConvertFrom-Json
$webappname=$json.webappname
$resourceGroup=$json.resourceGroup
$location=$json.location

$appdirectory=$PSScriptRoot + "/../build"

$packageFolder = $PSScriptRoot + "/temp";
$package = $packageFolder + "/package.zip"

if(!(Test-Path -Path $packageFolder))
{
    New-Item -ItemType directory -Path $packageFolder | Out-Null
}

# Remove zip file if it already exists
echo "Packaging build folder..."
if (Test-Path $package) 
{
  Remove-Item $package
}
Compress-Archive -Path $appdirectory/* -CompressionLevel Fastest -DestinationPath $package

# Log into Azure account
# Connect-AzureRmAccount

# Create a resource group
#New-AzureRmResourceGroup -Name $resourceGroup -Location $location

# Create an App Service plan in `Free` tier
#New-AzureRmAppServicePlan -Name $webappname -Location $location -ResourceGroupName $resourceGroup -Tier Free

# Create a web app
#New-AzureRmWebApp -Name $webappname -Location $location -AppServicePlan $webappname -ResourceGroupName $resourceGroup

# Get publishing profile for the web app
# $xml = [xml](Get-AzureRmWebAppPublishingProfile -Name $webappname `
# -ResourceGroupName $resourceGroup `
# -OutputFile null `
# -Format WebDeploy `
# -ErrorAction Stop)
$publishSettingsPath = $PSScriptRoot + "/publishsettings.xml"
$xml = Get-Content $publishSettingsPath -Raw | Out-String

# Extract connection information from publishing profile
$username = ([xml]$xml).SelectNodes("//publishProfile[@publishMethod=`"MSDeploy`"]/@userName").value
$password = ([xml]$xml).SelectNodes("//publishProfile[@publishMethod=`"MSDeploy`"]/@userPWD").value
$url = ([xml]$xml).SelectNodes("//publishProfile[@publishMethod=`"MSDeploy`"]/@publishUrl").value
$siteName = ([xml]$xml).SelectNodes("//publishProfile[@publishMethod=`"MSDeploy`"]/@msdeploySite").value

echo "Deploying via Kudu..."
# From https://github.com/projectkudu/kudu/wiki/Deploying-from-a-zip-file
# curl -X POST -u <user> --data-binary @<zipfile> https://{sitename}.scm.azurewebsites.net/api/zipdeploy
$curlArguments = 
    '-X ' +
    'POST ' +
    '-u ' + $username + ':' + $password + ' ' +
    '--data-binary @' + $package + ' ' +
    'https://' + $siteName + '.scm.azurewebsites.net/api/zipdeploy'
$commandLine = '&"curl.exe" --% ' + $curlArguments
Invoke-Expression $commandLine

# Cleanup
if (Test-Path $package) 
{
  Remove-Item $package
}
if(Test-Path -Path $packageFolder)
{
    Remove-Item $packageFolder
}

echo "Done!"