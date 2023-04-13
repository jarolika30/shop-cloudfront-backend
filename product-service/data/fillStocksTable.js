'use strict';

const { populateTable } = require('./populateTable');
const mockData = require('./products');


mockData.forEach((product) => {
  let params = {
    TableName: process.env.STOCKS_TABLE_NAME,
    Item: {
      product_id: product.id,
      count: product.count
    },
  };

  populateTable(params);
});

