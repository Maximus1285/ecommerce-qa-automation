/// <reference types="cypress" />

import urls from '../../../support/urls';

describe('Accessories Page', () => {
  beforeEach(() => {
    cy.deleteCustomProducts();
    cy.getProductCategories().then((response) => {
      const category = Array.from(response.body).find((obj) => obj.name === 'Accessories');
      cy.createProduct({
        name: 'Cypress-Product',
        type: 'simple',
        regular_price: '24.99',
        description: 'Product for testing purposes on Cypress',
        categories: [{ id: category.id }],
      }).as('product');
    });
  });

  it('should show accessories in the breadcrumbs', () => {
    cy.visit(urls.accessoriesPage, { timeout: 60000 });
    cy.get('.woocommerce-breadcrumb').should('contain.text', 'Accessories');
  });

  it('should add a product to cart from accessories', () => {
    cy.visit(urls.accessoriesPage);
    cy.get('@product').then((product) => {
      cy.get('.product').then(($products) => {
        const cypressProduct = $products.toArray().find(($product) => $product.textContent.includes(product.body.name));
        cy.wrap(cypressProduct).contains('Add to cart').click();
      });
      cy.get('.cart-contents').should('contain.text', product.body.price);
    });
  });
});
