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
  let transactionHistory = utils.getTransactionHistory(transactionData, beverageLogs);
  if (transactionHistory.length > 1) {
    return transactionHistory;
  }
  return "no entries";
};

const writeToFile = function(path, beverageLogs, writeFile) {
  beverageLogs = JSON.stringify(beverageLogs);
  writeFile(path, beverageLogs);
};

exports.query = query;
exports.save = save;
