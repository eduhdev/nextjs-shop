// load type definitions from Cypress module
/// <reference types="cypress" />

type ShowcaseAttributes = {
  name: string
  highlight?: boolean
  games?: boolean
}
declare namespace Cypress {
  interface Chainable {
    google(): Chainable<Window>

    getByDatCy(selector: string): Chainable<Element>

    shouldRenderBanner(): Chainable<Element>

    shouldRenderShowcase(attrs: ShowcaseAttributes): Chainable<Element>
  }
}
