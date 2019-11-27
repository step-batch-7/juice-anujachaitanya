const arrangeOptions = function(transaction, data) {
  transaction[data[0].slice(2)] = data[1];
  return transaction;
};

const validateOptions = function(data) {
  options = ["--qty", "--beverage", "--empId", "--date"];
  return options.includes(data[0]) && data.length == 2;
};

const validateCommand = function(command) {
  validCommand = ["--save", "--query"];
  return validCommand.includes(command);
};

const existsBeverageLogs = function(path, writeFile, exists) {
  if (!exists(path)) {
    writeFile(path, "[]", "utf8");
    return true;
  }
};

const getBeverageLogs = function(path, readFile) {
  let beverageLogs = readFile(path, "utf8");
  beverageLogs = JSON.parse(beverageLogs);
  return beverageLogs;
};

const getTotal = function(total, element) {
  return (total += +element[2]);
};

const getTransaction = function(transactionHistory, transaction) {
  let reference = transactionHistory[1];
  let value = transactionHistory[2];
  if (transaction[reference].includes(value)) {
    transaction = Object.values(transaction);
    transactionHistory[0].push(transaction);
  }
  return transactionHistory;
};

const getTransactionHistory = function(transactionData, beverageLogs) {
  let reference = transactionData.date ? "date" : "empId";
  let value = transactionData[reference];
  let transactionHistory = beverageLogs.reduce(getTransaction, [[], reference, value]);
  transactionHistory = transactionHistory[0];
  transactionHistory.push(transactionHistory.reduce(getTotal, 0));
  return transactionHistory;
};
exports.validateOptions = validateOptions;
exports.arrangeOptions = arrangeOptions;
exports.validateCommand = validateCommand;
exports.existsBeverageLogs = existsBeverageLogs;
exports.getBeverageLogs = getBeverageLogs;
exports.getTransactionHistory = getTransactionHistory;
