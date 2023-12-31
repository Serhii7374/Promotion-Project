import { defineConfig } from 'cypress';

export default defineConfig({

  e2e: {
    // baseUrl: 'https://promotion-project-e8793.web.app/'
    baseUrl: 'http://localhost:4200/'
  },

  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts'
  }
});
