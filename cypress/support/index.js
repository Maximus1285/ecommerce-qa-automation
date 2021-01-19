// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

// To add screenshot to the generated report for failing tests only
Cypress.on('test:after:run', (test, runnable) => {
  if (test.state === 'failed') {
    const parent = runnable.parent;
    const title = test.title;
    if (title.charAt(title.length - 1) === '.') {
      title = title.slice(0, -1);
    }
    let screenshotFileName = `${formatTitle(parent.title)} -- ${title}`;
    while (parent.parent) {
      parent = parent.parent;
      if (parent.title) {
        screenshotFileName = `${formatTitle(parent.title)} -- ${screenshotFileName}`;
      }
    }
    const specLocation = Cypress.spec.relative.split('cypress/integration/')[1];
    if (!test.hasOwnProperty('failedFromHookId')) {
      addContext({ test }, `assets/${specLocation}/${screenshotFileName} (failed).png`);
    }
    addContext({ test }, `assets/videos/${specLocation}.mp4`);
  }
});
