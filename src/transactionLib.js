const utils = require("./utilsLib");

const save = function(transactionData, beverageLogs, date, path, writeFile) {
  beverageDetails = {
    empId: transactionData.empId,
    beverage: transactionData.beverage,
    qty: transactionData.qty,
    time: date
  };
  beverageLogs.push(beverageDetails);
  writeToFile(path, beverageLogs, writeFile);
  return beverageDetails;
};

const query = function(transactionData, beverageLogs) {
  const transactiontitles = [["empId", "beverage", "qty", "time"]];
  let reference = transactionData.date || transactionData.empId;
  let transactionHistory = beverageLogs.reduce(getTransaction, [[], reference]);
  transactionHistory = transactionHistory[0];
  if (transactionHistory.length > 0) {
    return transactionHistory;
  }
  return "no entries";
};

const getTransaction = function(transactionHistory, transaction) {
  transaction = Object.values(transaction);
  if (transaction.includes(transactionHistory[1])) {
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
