// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const { oktaAccessToken } = require('@gopuff/quality-engineering-tools/okta-auth')

require('dotenv').config({ path: '.env' })

Cypress.Commands.add('loginByOkta', () => {
  
  async function getOktaAccessToken () {
    const RESULT = await oktaAccessToken(
      Cypress.env('auth_authorization'),
      Cypress.env('auth_authentication'),
      Cypress.env('auth_server_id'),
      Cypress.env('auth_client_id'),
      Cypress.env('auth_redirect_url'),
      Cypress.env('auth_username'),
      Cypress.env('auth_password')
    )
    window.localStorage.setItem('oktaCypress', JSON.stringify(userItem))
  }

})

Cypress.Commands.add('loginByOktaApi', (username, password) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('okta_domain')}/api/v1/authn`,
    body: {
      username,
      password,
    },
  }).then(({ body }) => {
    const user = body._embedded.user
    const config = {
      issuer: `${Cypress.env('okta_domain')}/oauth2/default`,
      clientId: Cypress.env('auth_client_id'),
      redirectUri: 'https://opsnet.gopuff.tech/callback',
      scope: ['openid', 'email', 'profile'],
    }

    const authClient = new OktaAuth(config)

    return authClient.token
      .getWithoutPrompt({ sessionToken: body.sessionToken })
      .then(({ tokens }) => {
        const userItem = {
          token: tokens.accessToken.value,
          user: {
            sub: user.id,
            email: user.profile.login,
            given_name: user.profile.firstName,
            family_name: user.profile.lastName,
            preferred_username: user.profile.login,
          },
        }

        window.localStorage.setItem('oktaCypress', JSON.stringify(userItem))

        log.snapshot('after')
        log.end()
      })
  })
})


