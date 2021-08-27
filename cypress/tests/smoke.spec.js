/// <reference types="cypress" />

describe('Smoke tests', function () {
  before(() => {
    cy.loginByOktaApi()
  })

  beforeEach(() => {
    cy.visit('/')
      .get('.MuiButton-label').click()
  })

  it('should show empty field error messages', function () {
    cy.log("Running the sample tests. ")
  })

})