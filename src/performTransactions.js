const fs = require("fs");
const inputHandler = require("./inputHandlingLib");
const transactions = require("./transactionLib");
const utils = require("./utilsLib");

const performOperation = function(input, path) {
  if (inputHandler.isValidTransaction(input) && inputHandler.areEnoughOptions(input)) {
    utils.existsBeverageLogs(path, fs.writeFileSync, fs.existsSync);
    let transaction = inputHandler.createObjectForTransaction(input);
    let allProcesses = { save: transactions.save, query: transactions.query };
    let beverageLogs = utils.getBeverageLogs(path, fs.readFileSync);
    let process = allProcesses[transaction.command];
    return process(transaction, beverageLogs, new Date(), path, fs.writeFileSync);
  }
  return "invalid input";
};

exports.performOperation = performOperation;
