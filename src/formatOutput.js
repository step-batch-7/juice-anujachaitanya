const constants = require("./constants");

const formatOutputForSave = function(transaction) {
  transaction.date = transaction.date.toJSON();
  let record = toRow(transaction);
  return `Transaction Recorded:\n${constants.titles}\n${record}`;
};

const toRow = function(transaction) {
  let names = "empId,beverage,qty,date".split(",");
  return names.map(name => transaction[name]);
};

const getTotal = function(total, record) {
  return total + +record[2];
};

const formatOutputForQuery = function(records) {
  const rows = records.map(toRow);
  const totalBeverages = rows.reduce(getTotal, 0);
  const transactionHistory = [constants.titles, rows.join("\n")].join("\n");
  return `${transactionHistory}\nTotal: ${totalBeverages} Juices`;
};

exports.formatOutputForQuery = formatOutputForQuery;
exports.formatOutputForSave = formatOutputForSave;
