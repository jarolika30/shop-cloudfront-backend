'use strict';
const csvParser = require('csv-parser');
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { SQSClient, SendMessageCommand } = require('@aws-sdk/client-sqs');

const s3Client = new S3Client({ region: 'us-east-1' });
const sqsClient = new SQSClient({ region: 'eu-central-1' });
const url =
  'https://sqs.us-east-1.amazonaws.com/241918472493/catalogItemsQueue';

const sendToSqs = async (data) => {
  console.log(data);

  const params = {
    QueueUrl: url,
    MessageBody: JSON.stringify(data)
  };

  console.log(`Sending SQS Command`);

  try {
    await sqsClient.send(new SendMessageCommand(params));
    console.log(`${data.length} items sent to SQS!`);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

module.exports.importFileParser = async (event) => {
  console.log(event);

  const params = {
    Bucket: 'import-service-staurova',
    Key: `uploaded/products.csv`
  };

  try {
    const productsData = [];
    const getObjectCommand = new GetObjectCommand(params);
    const s3Stream = await s3Client.send(getObjectCommand);
    const csvParser = s3Stream.Body.pipe(
      csv({ delimiter: ',', columns: true })
    );

    const promises = [];

    promises.push(
      new Promise((resolve) => {
        csvParser.on('data', (data) => {
          productsData.push(data);
        });
        csvParser.on('end', resolve);
      })
    );

    await Promise.all(promises);

    try {
      await sendToSqs(productsData);
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
