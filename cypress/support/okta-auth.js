const { oktaAccessToken } = require('@gopuff/quality-engineering-tools/okta-auth')

async function getOktaAccessToken () {
  const RESULT = await oktaAccessToken(
    Cypress.env("OKTA_AUTHENTICATION_SERVER"),
    Cypress.env("OKTA_AUTHORIZATION_SERVER"),
    Cypress.env("OKTA_AUTHORIZATION_SERVER_ID"),
    Cypress.env("OKTA_CLIENT_ID"),
    Cypress.env("OKTA_REDIRECT_URI"),
    Cypress.env("OKTA_USER_NAME"),
    Cypress.env("OKTA_PASSWORD")
  )
  console.log(`Result => ${JSON.stringify(RESULT)}`)
}

module.exports = {
  getOktaAccessToken
}
