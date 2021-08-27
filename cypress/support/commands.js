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
import { OktaAuth } from '@okta/okta-auth-js'
const { oktaAccessToken } = require('@gopuff/quality-engineering-tools/okta-auth')

require('dotenv').config({ path: '.env' })
Cypress.Commands.add('loginByOkta', () => {
  const OKTA_USER =  cy.wrap(
    new Promise(async function (resolve) {
      try {
        const RESULT = await oktaAccessToken(
          Cypress.env("OKTA_AUTHENTICATION_SERVER"),
          Cypress.env("OKTA_AUTHORIZATION_SERVER"),
          Cypress.env("OKTA_AUTHORIZATION_SERVER_ID"),
          Cypress.env("OKTA_CLIENT_ID"),
          Cypress.env("OKTA_REDIRECT_URI"),
          Cypress.env("OKTA_USER_NAME"),
          Cypress.env("OKTA_PASSWORD")
        )
        console.log('Maybe result...')
        console.log(`OKTA_USER => ${JSON.stringify(RESULT)}`)
        resolve(RESULT)
      } catch (error) {
        console.log('Maybe error...')
        resolve(error)
      }
    })
  )
})

Cypress.Commands.add('loginByOktaApi', (username = Cypress.env('auth_username'), password = Cypress.env('auth_password')) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('okta_domain')}/api/v1/authn`,
    body: {
      username,
      password,
    }
  }).then((response) => {
    const user = response.body._embedded.user
    const config = {
      issuer: `${Cypress.env('okta_domain')}/oauth2/default`,
      clientId: Cypress.env('auth_client_id'),
      redirectUri: Cypress.env('auth_redirect_url'),
      scope: ['openid', 'email', 'profile'],
    }
    const authClient = new OktaAuth(config)
    const token = authClient.token
      .getWithoutPrompt({ sessionToken: response.body.sessionToken })
      .then(({ tokens }) => {
        cy.log(`tokens => ${JSON.stringify(tokens.accessToken)}`)
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
        cy.log(`userItem => ${JSON.stringify(userItem)}`)

        window.localStorage.setItem('oktaCypress', JSON.stringify(userItem))
      })
  })
})
