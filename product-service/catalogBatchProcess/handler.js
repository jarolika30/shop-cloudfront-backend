const axios = require('axios');
const { SNSClient, PublishCommand } = require('@aws-sdk/client-sns');

const snsClient = new SNSClient({ region: 'us-east-1' });

module.exports.catalogBatchProcess = async (event) => {
  console.log(`Batch Process`);
  const promises = event.Records.map(async (products) => {
    const productsData = JSON.parse(products.body);
    const itemPromises = productsData.map(async (item) => {
      const snsParams = {
        Message: JSON.stringify(item),
        TopicArn: 'arn:aws:sns:us-east-1:735880260393:createProductTopic'
      };
      try {
        const apiUrl =
          'https://j02ahsxjv4.execute-api.us-east-1.amazonaws.com/dev/products';
        console.log(JSON.stringify(item));
        await axios.post(apiUrl, JSON.stringify(item));
        console.log(`Products Created`);
        await snsClient.send(new PublishCommand(snsParams));
        console.log(`SNS Sent`);
        return {
          statusCode: 201,
          body: JSON.stringify({
            message: `Products created and event published to SNS`
          })
        };
      } catch (error) {
        console.log(error.message);
        return {
          statusCode: 500,
          body: JSON.stringify({
            message: `Something went wrong! ${error.message}`
          })
        };
      }
    });
    await Promise.all(itemPromises);
  });

  const responses = await Promise.all(promises);
  return responses;
};
