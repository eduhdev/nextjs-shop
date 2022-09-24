/// <reference path="../support/index.d.ts"/>

describe.skip('Cypress TS', () => {
  it('should go to Google', () => {
    cy.google()
  })

  it('should change light/dark theme on website', () => {
    cy.visit('https://willianjusten.com.br/')

    cy.findByTitle(/Mudar o tema/i).click()
    cy.get('.light').should('exist')

    cy.findByTitle(/Mudar o tema/i).click()
    cy.get('.dark').should('exist')
  })
})
