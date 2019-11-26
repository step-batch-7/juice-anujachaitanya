const utils = require("./utilsLib");

const save = function(transactionData, beverageLogs, date, path, writeFile) {
  if (!beverageLogs[transactionData.empId]) {
    beverageLogs[transactionData.empId] = { orders: [], total: 0 };
  }
  beverageDetails = { beverage: transactionData.beverage, qty: transactionData.qty, time: date };
  beverageLogs[transactionData.empId].orders.push(beverageDetails);
  beverageLogs[transactionData.empId].total += +transactionData.qty;
  writeToFile(path, beverageLogs, writeFile);
  return beverageDetails;
};

const query = function(transactionData, beverageLogs) {
  const transactionHistory = [["empId", "beverage", "qty", "time"]];
  if (!beverageLogs[transactionData.empId]) {
    return "No entries for this empId";
  }
  for (let order of beverageLogs[transactionData.empId].orders) {
    let record = Object.values(order);
    record.splice(0, 0, transactionData.empId);
    transactionHistory.push(record);
  }
  transactionHistory.push("total " + beverageLogs[transactionData.empId].total);
  return transactionHistory.join("\n");
};

const writeToFile = function(path, beverageLogs, writeFile) {
  beverageLogs = JSON.stringify(beverageLogs);
  writeFile(path, beverageLogs);
};
exports.query = query;
exports.save = save;
