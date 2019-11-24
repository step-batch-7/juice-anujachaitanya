const utils = require("./utilsLib");

const transformDataIntoObj = function(transformedData) {
  let transaction = { beverage: undefined, qty: undefined, empId: undefined };
  transaction = transformedData[0].reduce(utils.arrangeOptions, transaction);
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

const isValidTransaction = function(input) {
  transformedData = transformDataToArray(input);
  let isValidInstruction = transformedData[0].every(utils.validateOptions);
  let isValidCommand = utils.validateCommand(transformedData[1]);
  if (isValidInstruction && isValidCommand) {
    return transformDataIntoObj(transformedData);
  }
  return "faltupana";
};
console.log(isValidTransaction(["--save", "--beverage", "orange", "--empId", 25313, "--qty", 1]));

exports.isValidTransaction = isValidTransaction;
exports.transformDataIntoObj = transformDataIntoObj;
exports.transformDataToArray = transformDataToArray;
