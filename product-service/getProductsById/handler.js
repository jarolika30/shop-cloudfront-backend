'use strict';

const mockProducts = require('../data/products');

module.exports.getProductsById = async (event) => {
  const { id } = event.pathParameters;
  const productItem = await mockProducts.find((product) => product.id === id);

  if (productItem) {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify(productItem)
    };
  }

  return {
    statusCode: 409,
    body: JSON.stringify({ message: `Product '${id}' not found` })
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
