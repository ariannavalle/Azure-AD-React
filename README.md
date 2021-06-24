# Azure-AD-React
Passport Azure AD OpenIDConnect setup with Node.js and React

## Backend - Build and run the application
Create .env file with the following config
```console
CLIENT_ID=
TENANT_ID=
APP_URL=
MONGO_URL=
KEY=
IV=
ROLLOVER_KEY=
ROLLOVER_IV=
FRONTEND_POINT
```
From the server root directory, run the commands:

* `$ npm i`
* `$ node app.js | bunyan`

## Frontend - Build and run the application
Create .env file with the following config
```console
REACT_APP_SERVER_POINT= 
REACT_APP_REDIRECT_URL= 
```
From the client root directory, run the commands:

* `$ npm i`
* `$ npm start`
