const utils = require("./utilsLib");

const save = function(transactionData, beverageLogs, date, path, writeFile) {
  beverageDetails = {
    empId: transactionData.empId,
    beverage: transactionData.beverage,
    qty: transactionData.qty,
    date: date
  };
  beverageLogs.push(beverageDetails);
  writeToFile(path, beverageLogs, writeFile);
  return Object.values(beverageDetails);
};

const query = function(transactionData, beverageLogs) {
  let reference = transactionData.date ? "date" : "empId";
  let value = transactionData[reference];
  let transactionHistory = beverageLogs.reduce(getTransaction, [[], reference, value]);
  transactionHistory = transactionHistory[0];
  if (transactionHistory.length > 0) {
    return transactionHistory;
  }
  return "no entries";
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

const writeToFile = function(path, beverageLogs, writeFile) {
  beverageLogs = JSON.stringify(beverageLogs);
  writeFile(path, beverageLogs);
};
exports.query = query;
exports.save = save;
