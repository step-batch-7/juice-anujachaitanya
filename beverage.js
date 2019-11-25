const inputHandler = require("./src/inputHandlingLib");
const transactionLib = require("./src/transactionLib");
const input = process.argv.slice(2);

const main = function() {
  let newInput = inputHandler.isValidTransaction(input);
  console.log(transactionLib.save(newInput, {}));
};

main();
