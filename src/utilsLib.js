const arrangeOptions = function(transaction, data) {
  transaction[data[0].slice(2)] = data[1];
  return transaction;
};

const validateOptions = function(data) {
  options = ["--qty", "--beverage", "--empId", "--date"];
  return options.includes(data[0]) && data.length == 2;
};

const validateCommand = function(command) {
  validCommand = ["--save", "--query"];
  return validCommand.includes(command);
};

const existsBeverageLogs = function(path, writeFile, exists) {
  if (!exists(path)) {
    writeFile(path, "[]", "utf8");
    return true;
  }
};

const getBeverageLogs = function(path, readFile) {
  let beverageLogs = readFile(path, "utf8");
  beverageLogs = JSON.parse(beverageLogs);
  return beverageLogs;
};

exports.validateOptions = validateOptions;
exports.arrangeOptions = arrangeOptions;
exports.validateCommand = validateCommand;
exports.existsBeverageLogs = existsBeverageLogs;
exports.getBeverageLogs = getBeverageLogs;
