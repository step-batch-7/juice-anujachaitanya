const inputHandler = require("./inputValidation");
const { createObjectForValidation, createObjectForTransaction } = require("./optionParsing");
const transactions = require("./transactionLib");
const format = require("./formatOutput");
const utils = require("./utilsLib");

const performOperation = function(input, fsFuncs, path, date) {
  if (inputHandler.isValidTransaction(input) && inputHandler.areEnoughOptions(input)) {
    utils.existsBeverageLogs(path, fsFuncs.writeFile, fsFuncs.existsFile, fsFuncs.encoding);
    let transactionDetails = createObjectForValidation(input);
    let allProcesses = { save: transactions.save, query: transactions.query };
    let beverageLogs = utils.getBeverageLogs(path, fsFuncs.readFile, fsFuncs.encoding);
    let process = allProcesses[transactionDetails.command];
    let transaction = createObjectForTransaction(transactionDetails);
    let records = process(transaction, beverageLogs, date, path, fsFuncs.writeFile);
    let formatOutputs = { save: format.formatOutputForSave, query: format.formatOutputForQuery };
    return formatOutputs[transactionDetails.command](records);
  }
  return "invalid input";
};

exports.performOperation = performOperation;
