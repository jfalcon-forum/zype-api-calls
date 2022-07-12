const axios = require("axios").default
const jwt_decode = require('jwt-decode')
const { getLivestreamAccess} = require('./naviga-livestream')
const { getAccessToken } = require('./auth0')

const oauthEndpoint = async (email, password) => {
  const response = await getAccessToken(email, password)
  let decodedToken = await jwt_decode(response.access_token)
  let authId = await decodedToken.sub
  const livestreamAccess = await getLivestreamAccess(authId)
  let responseObj = {
    ...response,
    ...livestreamAccess
  }
  console.log(responseObj)
  return responseObj;
}

const authorizeEndpoint = async (token) => {
  let decodedToken = await jwt_decode(token)
  let authId = await decodedToken.sub
  const livestreamAccess = await getLivestreamAccess(authId)
  console.log(livestreamAccess)
  return livestreamAccess; 
}

// Call oauthEndpoint first to get a token, then use that token to test the authorizeEndpoint