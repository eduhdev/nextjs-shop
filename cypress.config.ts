import { defineConfig } from 'cypress'

export default defineConfig({
  video: false,
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  },
  chromeWebSecurity: false,

  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack'
    }
  }
})
