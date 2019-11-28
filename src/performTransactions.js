const inputHandler = require("./inputHandlingLib");
const transactions = require("./transactionLib");
const format = require("./formatOutput");
const utils = require("./utilsLib");

const performOperation = function(input, path, fsFuncs) {
  if (inputHandler.isValidTransaction(input) && inputHandler.areEnoughOptions(input)) {
    utils.existsBeverageLogs(path, fsFuncs.writeFile, fsFuncs.existsFile);
    let transactionDetails = inputHandler.createObjectForValidation(input);
    let transaction = inputHandler.createObjectForTransaction(transactionDetails);
    let allProcesses = { save: transactions.save, query: transactions.query };
    let beverageLogs = utils.getBeverageLogs(path, fsFuncs.readFile);
    let process = allProcesses[transactionDetails.command];
    let records = process(transaction, beverageLogs, new Date(), path, fsFuncs.writeFile);
    let formatOutputs = { save: format.formatOutputForSave, query: format.formatOutputForQuery };
    return formatOutputs[transactionDetails.command](records);
  }
  return "invalid input";
};

exports.performOperation = performOperation;
