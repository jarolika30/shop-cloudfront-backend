'use strict';

const { populateTable } = require('./populateTable');

const mockData = require('./products');

mockData.forEach((product) => {
  let params = {
    TableName: process.env.PRODUCTS_TABLE_NAME,
    Item: {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price
    },
  };

  populateTable(params);
});
