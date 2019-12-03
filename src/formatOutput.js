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
  const format = totalBeverages == 1 ? "Juice" : "Juices";
  let arrangedRows = rows.join("\n");
  const transactionHistory = [constants.titles, arrangedRows].join("\n");
  return `${transactionHistory}\nTotal: ${totalBeverages} ${format}`;
};

exports.formatOutputForQuery = formatOutputForQuery;
exports.formatOutputForSave = formatOutputForSave;
