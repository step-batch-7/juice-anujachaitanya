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
  const transactionHistory = [["empId", "beverage", "qty", "time"]];
  for (let transaction of beverageLogs) {
    let record = Object.values(transaction);
    if (record.includes(transactionData.empId)) {
      transactionHistory.push(record);
    }
  }
  return transactionHistory.join("\n");
};

const writeToFile = function(path, beverageLogs, writeFile) {
  beverageLogs = JSON.stringify(beverageLogs);
  writeFile(path, beverageLogs);
};
exports.query = query;
exports.save = save;
