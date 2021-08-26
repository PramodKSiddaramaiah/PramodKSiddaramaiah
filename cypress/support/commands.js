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

Cypress.Commands.add('loginByOktaApi', (username, password) => {
  cy.request({
    method: 'POST',
    url: Cypress.env('OKTA_AUTHORIZATION_SERVER'),
    body: {
      username,
      password,
    },
  }).then(({ body }) => {
    const user = body._embedded.user
    const config = {
      issuer: Cypress.env('OKTA_AUTHENTICATION_SERVER'),
      clientId: Cypress.env('OKTA_CLIENT_ID'),
      redirectUri: Cypress.env('OKTA_REDIRECT_URI'),
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


