'use strict';

import populateTable from './populateTable';

import mockData from '../data/products';

mockData.forEach((product) => {
  let params = {
    TableName: 'products',
    Item: {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price
    },
  };

  populateTable(params);
});
