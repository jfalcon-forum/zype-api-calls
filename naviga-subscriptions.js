const axios = require("axios").default
require('dotenv').config()

// Gets all the subscriptions for a given user
const getNavigaSubscriptions = async (userId) => {
  let options = {
    method: 'GET',
    url: `https://aws-test.subscriberconcierge.com/Users/${userId}/Subscriptions/v2?request.customerRegistrationId=${userId}&request.includeStoppedSubscriptions=true`,
    headers: {
      'X-MediaGroupCode': 'ForumComm',
      'X-ClientCode': 'Forum',
      'X-PaperCode': 'TF',
      'X-SourceSystem': 'ExternalSystem',
      'Authorization': `bearer ${process.env.NAVIGA_TOKEN}`
    }
  }
  
  axios.request(options).then(function (response) {
    // Need to implement a forEach/Map to cycle through all subscriptions. We can check for SLS (livestream) and return the proper response.
    response.data.Result.OwnedSubscriptions.forEach(subscription => {
      // an idea is to create an array of pubs/status that AREN'T livestream to have after looping through. That way we can properly know if any sites have an active status and only kick out if livestream is Live.
      if (subscription.Status === 'L' && subscription.BaseProductPaperCode === "SLS") {
        console.log('active livestream account')
        return true
      }
  
      if (subscription.Status === 'L' && subscription.BaseProductPaperCode === "TF") {
        console.log('active forum account')
      }
    })
    
  }).catch(function (error) {
    if (error.response) {
      let errorMessage = {"statusCode": error.response.status, "statusText": error.response.statusText}
      console.log(errorMessage)
    }
  })
}