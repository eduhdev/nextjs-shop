/// <reference path="../support/index.d.ts"/>

describe('Game Page', () => {
  before(() => {
    cy.visit('/game/system-shock')
  })

  it('should render game page', () => {
    cy.getByDataCy('game-info').within(() => {
      cy.findByRole('heading', { name: /System Shock/i }).should('exist')
      cy.findByText(
        /Customers who pre-order this version of System Shock/i
      ).should('exist')
      cy.findByText('$84.99').should('exist')

      cy.findByRole('button', { name: /add to cart/i }).should('exist')
    })

    // gallery
    cy.findAllByRole('button', { name: /thumb \-/i }).should(
      'have.length.gt',
      0
    )

    // content
    cy.getByDataCy('content').within(() => {
      cy.findByRole('heading', { name: /description/i }).should('exist')
    })
    cy.getByDataCy('content').children().should('have.length.at.least', 2)

    // details
    cy.getByDataCy('game-details').within(() => {
      cy.findByRole('heading', { name: /game details/i }).should('exist')
      cy.findByRole('heading', { name: /developer/i }).should('exist')
      cy.findByRole('heading', { name: /release date/i }).should('exist')
      cy.findByRole('heading', { name: /platforms/i }).should('exist')
      cy.findByRole('heading', { name: /publisher/i }).should('exist')
      cy.findByRole('heading', { name: /rating/i }).should('exist')
      cy.findByRole('heading', { name: /genres/i }).should('exist')

      cy.findAllByText(/Night Dive Studios/i).should('have.length', 2)
      cy.findByText(/aug 29, 2021/i).should('exist')
      cy.findByRole('img', { name: /windows/i }).should('exist')
      cy.findByText(/free/i).should('exist')
      cy.findByText('Sci-fi / Shooter / FPP').should('exist')
    })

    // showcases
    cy.shouldRenderShowcase({
      name: 'Upcoming Games',
      highlight: true,
      games: false
    })
    cy.shouldRenderShowcase({
      name: 'You may like these games',
      highlight: false
    })
  })

  it('should add/remove game in cart', () => {
    cy.getByDataCy('game-info').within(() => {
      cy.findByRole('button', { name: /add to cart/i }).click()
      cy.findByRole('button', { name: /remove from cart/i }).should('exist')
    })

    cy.findAllByLabelText(/cart items/i)
      .first()
      .should('have.text', 1)
      .click()

    cy.getByDataCy('cart-list').within(() => {
      cy.findByRole('heading', { name: /System Shock/i }).should('exist')
    })

    cy.findAllByLabelText(/cart items/i)
      .first()
      .click()

    cy.getByDataCy('game-info').within(() => {
      cy.findByRole('button', { name: /remove from cart/i }).click()
      cy.findByRole('button', { name: /add to cart/i }).should('exist')
    })

    cy.findAllByLabelText(/cart items/i).should('not.exist')
  })
})
