/// <reference types="cypress" />

describe('Products API', () => {
  beforeEach(() => {
    cy.deleteCustomProducts();
  });

  it('should create a new product', () => {
    cy.getProductCategories().then((response) => {
      const category = Array.from(response.body).find((obj) => obj.name === 'Accessories');
      const product = {
        name: 'Cypress-Product',
        type: 'simple',
        regular_price: '24.99',
        description: 'Product for testing purposes on Cypress',
        categories: [{ id: category.id }],
      };
      cy.createProduct(product).then((response) => {
        expect(response.status).to.eq(201);
        console.log(response);
        Object.keys(product)
          .filter((key) => key !== 'categories')
          .forEach((key) => {
            expect(response.body).to.have.property(key, product[key]);
          });
      });
    });
  });

  it('should get all products', () => {
    cy.getProducts().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.a('array');
    });
  });
});
