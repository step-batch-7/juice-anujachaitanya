const inputHandler = require("./inputHandlingLib");
const transactions = require("./transactionLib");
const format = require("./formatOutput");
const utils = require("./utilsLib");

const performOperation = function(input, fsFuncs, path, date) {
  if (inputHandler.isValidTransaction(input) && inputHandler.areEnoughOptions(input)) {
    utils.existsBeverageLogs(path, fsFuncs.writeFile, fsFuncs.existsFile);
    let transactionDetails = inputHandler.createObjectForValidation(input);
    let allProcesses = { save: transactions.save, query: transactions.query };
    let beverageLogs = utils.getBeverageLogs(path, fsFuncs.readFile);
    let process = allProcesses[transactionDetails.command];
    let transaction = inputHandler.createObjectForTransaction(transactionDetails);
    let records = process(transaction, beverageLogs, date, path, fsFuncs.writeFile);
    let formatOutputs = { save: format.formatOutputForSave, query: format.formatOutputForQuery };
    return formatOutputs[transactionDetails.command](records);
  }
  return "invalid input";
};

exports.performOperation = performOperation;
