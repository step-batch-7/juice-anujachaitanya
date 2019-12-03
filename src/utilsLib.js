const fsFuncs = require("./constants").fsFuncs;

const arrangeOptions = function(transaction, data) {
  transaction[data[0].slice(2)] = data[1];
  return transaction;
};

const validateOptions = function(data) {
  options = ["--qty", "--beverage", "--empId", "--date"];
  return options.includes(data[0]) && data.length == 2;
};

const validateCommand = function(command) {
  validCommand = ["--save", "--query", "--beverage"];
  return validCommand.includes(command);
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
