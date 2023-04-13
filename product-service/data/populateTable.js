'use strict';

const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: 'us-east-1'
});

module.exports.populateTable = async (item) => {
  try {
    await dynamoDb.put(item).promise();
  } catch (err) {
    console.log(err);
  }
};
