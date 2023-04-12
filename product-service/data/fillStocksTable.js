'use strict';

import populateTable from './populateTable';

import mockData from '../data/products';


mockData.forEach((product) => {
  let params = {
    TableName: 'stocks',
    Item: {
      product_id: product.id,
      count: product.count
    },
  };

  populateTable(params);
});

