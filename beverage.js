const transaction = require("./src/performTransactions");
const config = require("./src/config");
const fsFuncs = require("./src/constants").fsFuncs;
const input = process.argv.slice(2);

const main = function() {
  let path = config.generateStorePath(process.env);
  let date = config.generateDate(process.env);
  console.log(date);
  console.log(transaction.performOperation(input, fsFuncs, path, date));
};

main();
