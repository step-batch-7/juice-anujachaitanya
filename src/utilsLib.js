const fsFuncs = require("./constants").fsFuncs;

const arrangeOptions = function(transaction, pair) {
  transaction[pair[0].slice(2)] = pair[1];
  return transaction;
};

const validateOptions = function(option) {
  const options = ["--qty", "--beverage", "--empId", "--date"];
  return options.includes(option[0]) && option.length == 2;
};

const validateCommand = function(command) {
  const validCommands = ["--save", "--query", "--beverage"];
  return validCommands.includes(command);
};

const existsBeverageLogs = function(path, writeFile, exists, encoding) {
  if (!exists(path)) {
    writeFile(path, "[]", encoding);
    return true;
  }
};

const getBeverageLogs = function(path, readFile, encoding) {
  let beverageLogs = readFile(path, encoding);
  beverageLogs = JSON.parse(beverageLogs);
  return beverageLogs;
};

const getTransactionHistoryForDate = function(value, key) {
  return function(transaction) {
    let date = transaction[key].slice(0, 10);
    return date == value;
  };
};

const getTransactionHistory = function(value, key) {
  return function(transaction) {
    return transaction[key] == value;
  };
};

exports.validateOptions = validateOptions;
exports.arrangeOptions = arrangeOptions;
exports.validateCommand = validateCommand;
exports.existsBeverageLogs = existsBeverageLogs;
exports.getBeverageLogs = getBeverageLogs;
exports.getTransactionHistory = getTransactionHistory;
exports.getTransactionHistoryForDate = getTransactionHistoryForDate;
