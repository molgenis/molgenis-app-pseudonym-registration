# Pseudonym registration app
Pseudonym registration app is a small app for [molgenis](https://github.com/molgenis/molgenis). It will help generate a pseudonym-id using the auto-id field of molgenis.

## Getting it working

1) Download the emx file with the needed tables and upload it to molgenis.
[https://github.com/molgenis/molgenis-app-pseudonym-registration/blob/master/emx/%20PseudonymRegistration.xlsx?raw=true]
The emx will hold a small 'PseudonymRegistration' entity with a 'id' and 'OriginalId' attribute. The generated pseudonym and original id will be stored here so make sure the entity is secured correctly. 
2) Checkout and build the app using 'yarn build'
3) Upload the resulting zip file in molgenis via the appmanager
4) Configure the app in the appmanager via the settings cog. 
in the 'Runtime Application configuration' you can set the following values.

| key |  |
| ----- | ----- |
| pseudonymRegistrationEntity | Sent the name of the entity here. Using the emx it should be 'PseudonymRegistration' |
| entityPackage  | Set the package name here so the app can find the entity |
| inputDescription | Optionally you can provide text on the initial screen to help the user of the application |
| resultDescription | Optionally you can provide text what to do with the generated pseudonym  |

5) To configure the look and feel of the generated id's you can set tags. [Find out more about tags](https://molgenis.gitbook.io/molgenis/data-management/guide-pseudonymisation)

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
