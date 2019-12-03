const utils = require("./utilsLib");
const { transformDataIntoObj, transformDataToArray } = require("./optionParsing");

const isValidTransaction = function(input) {
  transformedData = transformDataToArray(input);
  let isValidInstruction = transformedData[0].every(utils.validateOptions);
  let isValidCommand = utils.validateCommand(transformedData[1]);
  return isValidInstruction && isValidCommand;
};

const isValidBeverage = function(beverage) {
  return beverage != "";
};

const isValidEmpId = function(empId) {
  return Number.isInteger(+empId) || !empId;
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
  return true;
};

const checkOptForSave = function(transactionDetails) {
  return (
    isValidBeverage(transactionDetails.beverage) &&
    isValidEmpId(transactionDetails.empId) &&
    isValidQty(transactionDetails.qty) &&
    Object.keys(transactionDetails).length == 4
  );
};

const checkOptForQuery = function(transactionDetails) {
  return (
    isValidEmpId(transactionDetails.empId) &&
    isValidDate(transactionDetails.date) &&
    isValidBeverage(transactionDetails.beverage)
  );
};

const areEnoughOptions = function(transaction) {
  transactionDetails = transformDataToArray(transaction);
  transactionDetails = transformDataIntoObj(transactionDetails);
  let validityFunc = { save: checkOptForSave, query: checkOptForQuery };
  let validateEnoughArgv = validityFunc[transactionDetails.command];
  return validateEnoughArgv(transactionDetails);
};

exports.isValidTransaction = isValidTransaction;
exports.areEnoughOptions = areEnoughOptions;
exports.checkOptForSave = checkOptForSave;
exports.checkOptForQuery = checkOptForQuery;
exports.isValidDate = isValidDate;
