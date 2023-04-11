'use strict';

const AWS = require('aws-sdk');
const mockProducts = require('./products');

const dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: 'us-east-1'
});

mockProducts.forEach((product) => {
  let params = {
    TableName: 'stocks',
    Item: {
      product_id: product.id,
      count: product.count
    },
  };

  fillStocksTable(params);
});

async function fillStocksTable(item) {
  try {
    await dynamoDb.put(item).promise();
  } catch (err) {
    console.log(err);
  }
}
