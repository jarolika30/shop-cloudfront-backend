'use strict';

const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const s3Client = new S3Client({ region: 'us-east-1' });

module.exports.importProductsFile = async (event) => {
  console.log(event);

  const fileName = event.queryStringParameters.name;
  const params = {
    Bucket: 'import-service-staurova',
    Key: `uploaded/${fileName}`,
    ContentType: 'text/csv'
  };

  try {
    const command = new GetObjectCommand(params);
    const signedUrl = await getSignedUrl(s3Client, command);
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify(signedUrl)
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: `Something went wrong!` })
    };
  }
};
