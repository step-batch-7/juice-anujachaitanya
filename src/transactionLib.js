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
  return beverageDetails;
};

const query = function(transactionData, beverageLogs) {
  let transactionHistory = beverageLogs;
  for (let key in transactionData) {
    filterFunction = utils.getTransactionHistory(transactionData[key], key);
    transactionHistory = transactionHistory.filter(filterFunction);
  }
  return transactionHistory.length > 1 ? transactionHistory : [{ record: "no entries" }];
};

const writeToFile = function(path, beverageLogs, writeFile) {
  beverageLogs = JSON.stringify(beverageLogs);
  writeFile(path, beverageLogs);
};

exports.query = query;
exports.save = save;
