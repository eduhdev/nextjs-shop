// load type definitions from Cypress module
/// <reference types="cypress" />
type User = {
  username: string
  email: string
  password: string
}

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

    signUp(user: User): Chainable<Element>

    shouldBeLessThan(value: number): Chainable<Element>

    shouldBeGreaterThan(value: number): Chainable<Element>

    getFilterFields(filter: FieldsAttr[]): Chainable<Element>

    getByDataCy(selector: string): Chainable<Element>

    shouldRenderBanner(): Chainable<Element>

    shouldRenderShowcase(attrs: ShowcaseAttributes): Chainable<Element>

    signIn(email?: string, password?: string): Chainable<Element>

    addToCartByIndex(value: number): Chainable<Element>

    removeFromCartByIndex(value: number): Chainable<Element>
  }
}
