const utils = require("./utilsLib");

const save = function(transactionData, beverageLogs, date, path, writeFile) {
  transactionData.date = date;
  beverageLogs.push(transactionData);
  writeToFile(path, beverageLogs, writeFile);
  return transactionData;
};

const query = function(transactionData, beverageLogs) {
  let transactionHistory = beverageLogs;
  for (let key in transactionData) {
    filterFunction = utils.getTransactionHistory(transactionData[key], key);
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
