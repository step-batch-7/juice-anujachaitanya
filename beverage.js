const transaction = require("./src/performTransactions");
const fs = require("fs");
const input = process.argv.slice(2);

const main = function() {
  let fsFuncs = {
    readFile: fs.readFileSync,
    writeFile: fs.writeFileSync,
    existsFile: fs.existsSync
  };
  console.log(transaction.performOperation(input, "./beverageLogs.json", fsFuncs));
};

main();
