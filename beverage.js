const transaction = require("./src/performTransactions");
const input = process.argv.slice(2);

const main = function() {
  console.log(transaction.performOperation(input, "./beverageLogs.json"));
};

main();
