// load type definitions from Cypress module
/// <reference types="cypress" />

type FieldsAttr = {
  label: string
  name: string | number
}
type ShowcaseAttributes = {
  name: string
  highlight?: boolean
  games?: boolean
}
declare namespace Cypress {
  interface Chainable {
    google(): Chainable<Window>

    getByDataCy(selector: string): Chainable<Element>

    shouldRenderBanner(): Chainable<Element>

    shouldRenderShowcase(attrs: ShowcaseAttributes): Chainable<Element>

    getFilterFields(filter: FieldsAttr[]): Chainable<Element>

    shouldBeLessThan(value: number): Chainable<Element>

    shouldBeGreaterThan(value: number): Chainable<Element>
  }
}
