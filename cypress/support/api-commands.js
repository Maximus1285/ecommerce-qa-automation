import endpoints from './endpoints';
import requestOptions from './request-options';

Cypress.Commands.add('getProductCategories', () => {
  return cy.request({
    ...requestOptions,
    url: endpoints.product.categories,
    method: 'GET',
  });
});

Cypress.Commands.add('getProducts', () => {
  return cy.request({
    ...requestOptions,
    url: endpoints.product.url,
    method: 'GET',
  });
});

Cypress.Commands.add('createProduct', (product) => {
  return cy.request({
    ...requestOptions,
    url: endpoints.product.url,
    method: 'POST',
    body: product,
  });
});

Cypress.Commands.add('deleteProduct', (productId) => {
  return cy.request({
    ...requestOptions,
    url: `${endpoints.product.url}/${productId}`,
    method: 'DELETE',
    qs: { force: true },
  });
});
