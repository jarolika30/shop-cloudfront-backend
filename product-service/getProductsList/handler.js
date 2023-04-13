'use strict';

const { DynamoDBClient, GetItemCommand } = require('@aws-sdk/client-dynamodb');
const {
  DynamoDBDocumentClient,
  ScanCommand
} = require('@aws-sdk/lib-dynamodb');
const dDBClient = new DynamoDBClient({ region: 'eu-central-1' });
const dDBDocClient = DynamoDBDocumentClient.from(dDBClient);

const fetchProductsData = async () => {
  const params = {
    TableName: process.env.PRODUCTS_TABLE_NAME
  };
  const scanCommand = new ScanCommand(params);
  try {
    const result = await dDBDocClient.send(scanCommand);
    return result.Items;
  } catch (error) {
    throw new Error(error);
  }
};

const getProductStock = async (productId) => {
  const params = {
    TableName: process.env.STOCKS_TABLE_NAME,
    Key: {
      product_id: { S: productId }
    }
  };
  const getItemCommand = new GetItemCommand(params);
  try {
    const result = await dDBDocClient.send(getItemCommand);

    return result.Item.count.N;
  } catch (error) {
    throw new Error(error);
  }
};

const joinProductTables = async () => {
  try {
    const products = await fetchProductsData();
    const modifiedProducts = Promise.all(
      products.map(async (item) => {
        item.count = await getProductStock(item.id);
        return item;
      })
    );
    return modifiedProducts;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getProductsList = async (event) => {
  const products = await joinProductTables();

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(products)
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
