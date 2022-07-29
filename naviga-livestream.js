const axios = require("axios").default
require('dotenv').config()

const getLivestreamAccess = async (userId) => {
  let options = {
    method: 'POST',
    url: 'https://aws-test.subscriberconcierge.com/DigitalAccess',
    headers: {
      'X-MediaGroupCode': 'ForumComm',
      'X-ClientCode': 'Forum',
      'X-PaperCode': 'SLS',
      'X-SourceSystem': 'ExternalSystem',
      'Authorization': `bearer ${process.env.NAVIGA_TOKEN}`
    },
    data: {
      "CustomerRegistrationId": userId,
      "EntitlementCode": "webSite",
      "Device": "Desktop",
      "FromUrl": "string",
      "ReturnUrl": "string",
      "IsAccess": true
    } 
  }
  
  const response = axios.request(options).then((response) => {
    // response should be true/false then return out a response
    console.log(response.data)
    return response.data
  }).catch((error) => {
    if (error) {
      console.log(error)
    }
  })

  return await response
}

exports.getLivestreamAccess = getLivestreamAccess;