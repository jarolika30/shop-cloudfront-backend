'use strict';

const AWS = require('aws-sdk');
const mockProducts = require('./products');

const dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: 'us-east-1'
});

mockProducts.forEach((product) => {
  let params = {
    TableName: 'products',
    Item: {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price
    },
  };

  fillProductsTable(params);
});

async function fillProductsTable(item) {
  try {
    await dynamoDb.put(item).promise();
  } catch (err) {
    console.log(err);
  }
}
