'use strict';

const { DynamoDBClient, GetItemCommand } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');
const { unmarshall } = require('@aws-sdk/util-dynamodb');

const dDBClient = new DynamoDBClient({ region: 'us-east-1' });
const dDBDocClient = DynamoDBDocumentClient.from(dDBClient);

const fetchProductData = async (productId) => {
  const params = {
    TableName: process.env.PRODUCTS_TABLE_NAME,
    Key: {
      id: { S: productId }
    }
  };

  const getItemCommand = new GetItemCommand(params);

  try {
    const result = await dDBDocClient.send(getItemCommand);
    const unmarshalledItem = unmarshall(result.Item);

    return unmarshalledItem;
  } catch (error) {
    console.log(error);
  }
};

const fetchProductStock = async (productId) => {
  const params = {
    TableName: process.env.STOCKS_TABLE_NAME,
    Key: {
      product_id: { S: productId }
    },
    ProjectionExpression: 'itemCount'
  };

  const getItemCommand = new GetItemCommand(params);

  try {
    const result = await dDBDocClient.send(getItemCommand);
    const unmarshalledItemStock = unmarshall(result.Item);

    return unmarshalledItemStock;
  } catch (error) {
    console.log(error);
  }
};

const modifyProduct = async (productId) => {
  try {
    const product = await fetchProductData(productId);
    const productStock = await fetchProductStock(productId);
    product.count = productStock.count;

    return product;
  } catch (err) {
    console.log(err);
  }
};

module.exports.getProductsById = async (event) => {
  const { id } = event.pathParameters;
  const productItem = await modifyProduct(id);

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
    statusCode: 400,
    body: JSON.stringify({ message: `Product '${id}' not found` })
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
