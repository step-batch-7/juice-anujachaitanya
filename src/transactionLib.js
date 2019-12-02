const utils = require("./utilsLib");

const save = function(transactionData, beverageLogs, date, path, writeFile) {
  transactionData.date = date;
  beverageLogs.push(transactionData);
  writeToFile(path, beverageLogs, writeFile);
  return transactionData;
};

const query = function(transactionData, beverageLogs) {
  const filterFuncs = {
    empId: utils.getTransactionHistory,
    date: utils.getTransactionHistoryForDate,
    beverage: utils.getTransactionHistory
  };
  let transactionHistory = beverageLogs;
  for (let key in transactionData) {
    filterFunction = filterFuncs[key](transactionData[key], key);
    transactionHistory = transactionHistory.filter(filterFunction);
  }
  return transactionHistory;
};

const writeToFile = function(path, beverageLogs, writeFile) {
  beverageLogs = JSON.stringify(beverageLogs);
  writeFile(path, beverageLogs);
};

exports.query = query;
exports.save = save;
