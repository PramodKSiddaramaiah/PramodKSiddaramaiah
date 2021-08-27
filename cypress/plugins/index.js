/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
require('dotenv').config({ path: '.env' })
/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
    
  config.env.auth_authorization = process.env.OKTA_AUTHORIZATION_SERVER
  config.env.auth_authentication = process.env.OKTA_AUTHENTICATION_SERVER
  config.env.auth_server_id = process.env.OKTA_AUTHORIZATION_SERVER_ID
  config.env.auth_client_id = process.env.OKTA_CLIENT_ID
  config.env.auth_redirect_url = process.env.OKTA_REDIRECT_URI
  config.env.auth_username = process.env.OKTA_USER_NAME
  config.env.auth_password = process.env.OKTA_PASSWORD
  config.env.okta_domain = process.env.OKTA_DOMAIN

  console.log(`config => ${JSON.stringify(config)}`)
 return config
}
}

require('dotenv').config({ path: '.env' })

module.exports = (on, config) => {

  config.env.OKTA_AUTHORIZATION_SERVER = process.env.OKTA_AUTHORIZATION_SERVER
  config.env.OKTA_AUTHENTICATION_SERVER = process.env.OKTA_AUTHENTICATION_SERVER
  config.env.OKTA_AUTHORIZATION_SERVER_ID = process.env.OKTA_AUTHORIZATION_SERVER_ID
  config.env.OKTA_CLIENT_ID = process.env.OKTA_CLIENT_ID
  config.env.OKTA_REDIRECT_URI = process.env.OKTA_REDIRECT_URI
  config.env.OKTA_USER_NAME = process.env.OKTA_USER_NAME
  config.env.OKTA_PASSWORD = process.env.OKTA_PASSWORD
  
  return config
}
