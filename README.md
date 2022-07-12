# zype-api-calls

Within the index file, two functions need to be set in order to run. 

- oauthEndpoint - Uses email and password; returns Auth0 & Naviga responses. Need to use the access_token for next call
- authorizeEndpoint - Uses token; returns Naviga response

Both calls should log out the responses

To initalize local environment

`npm install`

`node index.js`

You also will need to create a .env file that contains the NAVIGA_TOKEN, ZYPE_AUTH_CLIENT_ID, and ZYPE_AUTH_SECRET_ID values
