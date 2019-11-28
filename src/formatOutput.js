const constants = require("./constants");

const formatOutputForSave = function(transaction) {
  let record = Object.values(transaction);
  return [constants.titles, record].join("\n");
};

const formatOutputForQuery = function(records) {
  records = records.map(x => Object.values(x));
  return [constants.titles, records].join("\n");
};

exports.formatOutputForQuery = formatOutputForQuery;
exports.formatOutputForSave = formatOutputForSave;
