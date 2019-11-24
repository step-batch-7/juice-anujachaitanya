const arrangeOptions = function(transaction, data) {
  transaction[data[0].slice(2)] = data[1];
  return transaction;
};
const validateOptions = function(data) {
  options = ["--qty", "--beverage", "--empId"];
  return options.includes(data[0]);
};

const validateCommand = function(command) {
  validCommand = ["--save", "--query"];
  return validCommand.includes(command);
};

exports.validateOptions = validateOptions;
exports.arrangeOptions = arrangeOptions;
exports.validateCommand = validateCommand;
