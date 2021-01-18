/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Returns the list of product categories
     * @example
     * cy.getProductCategories()
     */
    getProductCategories(): Chainable<any>;

    /**
     * Creates a new product
     * @example
     * cy.createProduct({ name: 'Premium Quality', type: 'simple', categories: [{ id: 9 }] })
     */
    createProduct(product: object): Chainable<any>;

    /**
     * List all the products
     * @example
     * cy.getProducts()
     */
    getProducts(): Chainable<any>;

    /**
     * Deletes a product
     * @param {number} productId
     * @example
     * cy.deleteProduct(1)
     */
    deleteProduct(productId: number): Chainable<any>;
  }
}
