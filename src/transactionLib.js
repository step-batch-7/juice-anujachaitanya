const utils = require("./utilsLib");

const save = function(transactionData, path, readFile, writeFile, date) {
  let beverageLogs = utils.getBeverageLogs(path, readFile);
  beverageLogs = JSON.parse(beverageLogs);
  beverage = transactionData.beverage;
  quantity = transactionData.qty;
  empId = transactionData.empId;
  if (!beverageLogs[empId]) {
    beverageLogs[empId] = {};
    beverageLogs[empId].orders = [];
    beverageLogs[empId].total = 0;
  }
  beverageDetails = { beverage: beverage, qty: quantity, time: date };
  beverageLogs[empId].orders.push(beverageDetails);
  beverageLogs[empId].total += +quantity;
  beverageLogs = JSON.stringify(beverageLogs);
  writeFile(path, beverageLogs);
  return "transaction successful";
};

const query = function(transactionData, path, readFile) {
  transactionHistory = [["empId", "beverage", "qty", "time"]];
  empId = transactionData.empId;
  let beverageLogs = utils.getBeverageLogs(path, readFile);
  beverageLogs = JSON.parse(beverageLogs);
  if (!beverageLogs[empId]) {
    return "No entries for this empId";
  }
  for (let order of beverageLogs[empId].orders) {
    let record = Object.values(order);
    record.splice(0, 0, empId);
    transactionHistory.push(record);
  }
  return transactionHistory.join("\n");
};

exports.query = query;
exports.save = save;
