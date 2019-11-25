const fs = require("fs");
const inputHandler = require("./inputHandlingLib");
const transactions = require("./transactionLib");
const utils = require("./utilsLib");

const performOperation = function(input, path) {
  if (inputHandler.isValidTransaction && inputHandler.areEnoughOptions) {
    utils.existsBeverageLogs(path, fs.writeFileSync, fs.existsSync);
    let transaction = inputHandler.createObjectForTransaction(input);
    let allProcesses = { save: transactions.save, query: transactions.query };
    let process = allProcesses[transaction.command];
    console.log("my path", path);
    process(transaction, path, fs.readFileSync, fs.writeFileSync);
    return "transaction successful !";
  }
  return "invalid input";
};
console.log(
  performOperation(
    ["--save", "--beverage", "orange", "--empId", "1", "--qty", "123"],
    "./beverageLogs.json"
  )
);
// console.log(utils.existsBeverageLogs("./beverageLogs.json", fs.writeFileSync, fs.existsSync));
