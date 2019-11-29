const fs = require("fs");
const fsFuncs = {
  writeFile: fs.writeFileSync,
  readFile: fs.readFileSync,
  existsFile: fs.existsSync,
  encoding: "utf8"
};
const titles = ["Employee ID", " Beverage", " Quantity", " Date"];
const path = process.env.JUICE_TRANSACTIONS_STORE_PATH || "./beverageLogs.json";
exports.fsFuncs = fsFuncs;
exports.titles = titles;
exports.path = path;
