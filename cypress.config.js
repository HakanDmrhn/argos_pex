const { defineConfig } = require("cypress");
const { registerArgosTask } = require("@argos-ci/cypress/task");

module.exports = defineConfig({
  defaultCommandTimeout: 30000,
  responseTimeout: 60000,
  chromeWebSecurity: false,
  redirectionLimit: 50,
  userAgent: 'testing_agent',
  env: {
    AUTH_USER: 'staging',
    AUTH_PASS: 'Mimfi34Voxuv',
    js_files_url: '/js_minify/*.min.js',
    js_files_hostname: 'www.plissee-experte.de',
    catch_JS_Error: true,
  },
  // setupNodeEvents can also be defined in "component"
  e2e: {
    baseUrl: 'https://www.plissee-experte.de',
    async setupNodeEvents(on, config) {
      registerArgosTask(on, config, {
        // Enable upload to Argos only when it runs on CI.
        uploadToArgos: !!process.env.CI,
        // Set your Argos token (required only if you don't use GitHub Actions).
        token: "7f5b38da220eeccf5d8c12dde30696671e59c012",
      });

      // include any other plugin code...
    },
  },
});