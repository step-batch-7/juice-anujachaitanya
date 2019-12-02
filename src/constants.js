const fs = require("fs");
const fsFuncs = {
  writeFile: fs.writeFileSync,
  readFile: fs.readFileSync,
  existsFile: fs.existsSync,
  encoding: "utf8"
};
const titles = ["Employee ID", " Beverage", " Quantity", " Date"];
exports.fsFuncs = fsFuncs;
exports.titles = titles;
