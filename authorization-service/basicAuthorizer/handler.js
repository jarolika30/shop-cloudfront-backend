'use strict';

module.exports.basicAuthorizer = async (event, context) => {
  const { authorizationToken } = event;

  if (!authorizationToken) {
    return generatePolicy('user', 'Deny', event.methodArn);
  }

  const encodedCreds = authorizationToken.split(' ')[1];
  const buff = Buffer.from(encodedCreds, 'base64');
  const [username, password] = buff.toString('utf-8').split(':');
  const storedUsername = 'jarolika30';
  const storedPassword = process.env.USER_PASSWORD;

  if (username !== storedUsername || password !== storedPassword) {
    return generatePolicy('user', 'Deny', event.methodArn);
  }

  return generatePolicy('user', 'Allow', event.methodArn);
};

const generatePolicy = (principalId, effect, resource) => {
  const authResponse = {};

  authResponse.principalId = principalId;

  if (effect && resource) {
    const policyDocument = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    const statementOne = {};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }

  return authResponse;
};
