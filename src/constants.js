const fs = require("fs");
const fsFuncs = {
  writeFile: fs.writeFileSync,
  readFile: fs.readFileSync,
  existsFile: fs.existsSync,
  encoding: "utf"
};
const titles = ["Employee Id", "Beverage", "quantity", "Date"];
exports.fsFuncs = fsFuncs;
exports.titles = titles;
