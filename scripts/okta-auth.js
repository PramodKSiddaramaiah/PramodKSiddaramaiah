const { oktaAccessToken } = require('@gopuff/quality-engineering-tools/okta-auth')

require('dotenv').config({ path: '.env' })
 
const {
  OKTA_AUTHENTICATION_SERVER,
  OKTA_AUTHORIZATION_SERVER,
  OKTA_AUTHORIZATION_SERVER_ID,
  OKTA_CLIENT_ID,
  OKTA_REDIRECT_URI,
  OKTA_USER_NAME,
  OKTA_PASSWORD
} = process.env

async function getOktaAccessToken () {
  const RESULT = await oktaAccessToken(
    OKTA_AUTHENTICATION_SERVER,
    OKTA_AUTHORIZATION_SERVER,
    OKTA_AUTHORIZATION_SERVER_ID,
    OKTA_CLIENT_ID,
    OKTA_REDIRECT_URI,
    OKTA_USER_NAME,
    OKTA_PASSWORD
  )

  console.log(`Result => ${JSON.stringify(RESULT)}`)
}

module.exports = {
  getOktaAccessToken
}
