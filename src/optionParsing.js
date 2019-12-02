const createObjectForValidation = function(input) {
  let transactionDetails = transformDataToArray(input);
  transactionDetails = transformDataIntoObj(transactionDetails);
  return transactionDetails;
};

const createObjectForTransaction = function(transactionDetails) {
  let transaction = JSON.stringify(transactionDetails);
  transaction = JSON.parse(transaction);
  delete transaction.command;
  return transaction;
};
const transformDataIntoObj = function(transformedData) {
  let transaction = {};
  for (let pair of transformedData[0]) {
    transaction[pair[0].slice(2)] = pair[1];
  }
  transaction.command = transformedData[1].slice(2);
  return transaction;
};

const transformDataToArray = function(input) {
  transformedData = [];
  for (let index = 1; index < input.length; index += 2) {
    transformedData.push([input[index], input[index + 1]]);
  }
  let command = input[0];
  return [transformedData, command];
};

module.exports = {
  createObjectForTransaction,
  createObjectForValidation,
  transformDataToArray,
  transformDataIntoObj
};
