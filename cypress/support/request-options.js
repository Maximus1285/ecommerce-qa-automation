export default {
  auth: {
    username: Cypress.env('username'),
    password: Cypress.env('password'),
  },
  'Content-Type': 'application/json',
};
