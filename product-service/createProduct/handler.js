'use strict';

const { DynamoDBClient, PutItemCommand } = require('@aws-sdk/client-dynamodb');

const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');

const dDBClient = new DynamoDBClient({ region: 'us-east-1' });
const dDBDocClient = DynamoDBDocumentClient.from(dDBClient);

const putItem = async (item) => {
  const params = {
    TableName: process.env.PRODUCTS_TABLE_NAME,
    Item: item
  };

  const putCommand = new PutItemCommand(params);

  try {
    await dDBDocClient.send(putCommand);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.createProduct = async (event) => {
  if (event.body) {
    const { newProduct } = event.body;

    await putItem(newProduct);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      }
    };
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'An error occurred while trying to insert a new element' })
    };
  }
};
