const requestBaseUrl = 'wp-json/wc/v3';
const productsUrl = `${requestBaseUrl}/products`;

export default {
  product: {
    url: productsUrl,
    categories: `${productsUrl}/categories`,
  },
};
