const utils = require("./utilsLib");

const transformDataIntoObj = function(transformedData) {
  let transaction = { beverage: undefined, qty: undefined, empId: undefined, date: undefined };
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
  return isValidInstruction && isValidCommand;
};

const isValidBeverage = function(beverage) {
  return typeof beverage == "string";
};

const isValidEmpId = function(empId) {
  return Number.isInteger(+empId);
};

const isValidQty = function(qty) {
  return Number.isInteger(+qty);
};

const isValidDate = function(date) {
  if (date) {
    date = date.split("-");
    date = new Date(date[0], date[1], date[2]);
    return date.getYear() && date.getMonth() && date.getDate();
  }
};

const checkOptForSave = function(transactionDetails) {
  return (
    isValidBeverage(transactionDetails.beverage) &&
    isValidEmpId(transactionDetails.empId) &&
    isValidQty(transactionDetails.qty)
  );
};

const checkOptForQuery = function(transactionDetails) {
  return isValidEmpId(transactionDetails.empId) || isValidDate(transactionDetails.date);
};

const areEnoughOptions = function(transaction) {
  transactionDetails = transformDataToArray(transaction);
  transactionDetails = transformDataIntoObj(transactionDetails);
  let validityFunc = { save: checkOptForSave, query: checkOptForQuery };
  let validateEnoughArgv = validityFunc[transactionDetails.command];
  return validateEnoughArgv(transactionDetails);
};

const createObjectForTransaction = function(input) {
  let transactionDetails = transformDataToArray(input);
  transactionDetails = transformDataIntoObj(transactionDetails);
  return transactionDetails;
};

exports.isValidTransaction = isValidTransaction;
exports.transformDataIntoObj = transformDataIntoObj;
exports.transformDataToArray = transformDataToArray;
exports.areEnoughOptions = areEnoughOptions;
exports.createObjectForTransaction = createObjectForTransaction;
exports.checkOptForSave = checkOptForSave;
exports.checkOptForQuery = checkOptForQuery;
