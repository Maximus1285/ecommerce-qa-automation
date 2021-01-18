/// <reference types="cypress" />

import urls from '../../../support/urls';

context('Accessories Page', () => {
  const deleteProducts = () => {
    cy.getProducts().then((response) => {
      Array.from(response.body)
        .filter((product) => product.name.includes('Cypress'))
        .forEach((product) => cy.deleteProduct(product.id));
    });
  };

  beforeEach(() => {
    deleteProducts();
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
    cy.visit(urls.accessoriesPage);
  });

  it('should show accessories in the breadcrumbs', () => {
    cy.get('.woocommerce-breadcrumb').should('contain.text', 'Accessories');
  });

  it('should add a product to cart from accessories', () => {
    cy.get('@product').then((product) => {
      cy.get('.product').then(($products) => {
        const cypressProduct = $products.toArray().find(($product) => $product.textContent.includes(product.body.name));
        cy.wrap(cypressProduct).contains('Add to cart').click();
      });
      cy.get('.cart-contents').should('contain.text', product.body.price);
    });
  });
});
