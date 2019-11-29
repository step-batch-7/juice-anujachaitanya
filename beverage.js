const transaction = require("./src/performTransactions");
const fsFuncs = require("./src/constants").fsFuncs;
const input = process.argv.slice(2);

const main = function() {
  date = process.env.NOW || new Date().toJSON();
  console.log(transaction.performOperation(input, "./beverageLogs.json", fsFuncs, date));
};

main();
