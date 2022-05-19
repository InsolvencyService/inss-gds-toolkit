# inss-gds-toolkit - INSS GDS Toolkit

## Introduction

This solution is used to build assets for use by other web apps, and these assets should be deployed to a CDN. 

The assets produced are output to these folders:

* wwwroot\cs\\**
* wwwroot\js\\**
* wwwroot\inss-gds-toolkit\\**

> Note: Do not edit these assets directly as they are output as part of the build process.

The deployment should copy these folders to a suitable CDN for onward consumption by other INSS web apps to use the GDS toolkit.

The solution also contains a sample MVC web app, used to test the assets.

## Getting started

Simply press F5, and the assets will be rebuilt and a sample web app will run.
The sample app allows the GDS Toolkit features and any customisation to be tested prior to releasing to CDN in the pipeline.

## Development

This solution uses *node modules* and the *govuk-frontend* node module to build the assets.

The assets are built using *gulp* with the *gulpfile.js* and the Visual Studio *Task runner*.

The gulpfile.js references files from the *scss* folder which contains parameters (colours etc) used to build the GDS toolkit assets.

For example, *_inss-gds-toolkit-variable.scss* contains the colour used for the GDS *branding bar*.

The gulpfile.js also uses folders and files from the *INSS.Scripts* folder. 
This folder contains *scss* and *js* sub-folders and under them a further sub-folder for application specific code i.e. *inss-app*.
These application folders allow the inclusion of custom SCSS and JavaScript, which will be included in the assets created in *wwwroot* when built.

## Configuration 

No app settings are required to run this solution.

## App settings

No app settings are required.

## 3rd party tools

* [GDS Toolkit](https://design-system.service.gov.uk/get-started/)

## Built With


* Microsoft Visual Studio 2022
* .NET 6
