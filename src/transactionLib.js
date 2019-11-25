const utils = require("./utilsLib");

const save = function(transactionData, path, readFile, writeFile) {
  let beverageLogs = utils.getBeverageLogs(path, readFile);
  console.log("beverageLogs", beverageLogs);
  beverageLogs = JSON.parse(beverageLogs);
  console.log(beverageLogs);
  beverage = transactionData.beverage;
  quantity = transactionData.qty;
  date = new Date();
  empId = transactionData.empId;
  console.log("before if", beverageLogs[empId]);
  if (!beverageLogs[empId]) {
    beverageLogs[empId] = {};
    beverageLogs[empId].orders = [];
    beverageLogs[empId].total = 0;
  }
  beverageDetails = { beverage: beverage, qty: quantity, time: date };
  beverageLogs[empId].orders.push(beverageDetails);
  beverageLogs[empId].total += quantity;
  beverageLogs = JSON.stringify(beverageLogs);
  writeFile(path, beverageLogs);
};

const query = function(transactionData, beverageLogs) {
  transactionHistory = [];
  empId = transactionData.empId;
  if (!beverageLogs[empId]) {
    return "No entries for this empId";
  }
  for (let order of beverageLogs[empId].orders) {
    transactionHistory.push(Object.values(order));
  }
  return transactionHistory;
};

exports.query = query;
exports.save = save;
