const assert = require("assert");
const utils = require("../src/utilsLib");

describe("arrangeOptions", () => {
  it("should arrange option to respective key", () => {
    let actual = utils.arrangeOptions({ beverage: undefined }, ["--beverage", "orange"]);
    let expected = { beverage: "orange" };
    assert.deepStrictEqual(actual, expected);
  });
});

describe("validateOptions", () => {
  it("should validate correct options", () => {
    assert.ok(utils.validateOptions(["--beverage", "orange"]));
  });

  it("should invalidate incorrect options", () => {
    assert.ok(!utils.validateOptions(["--beverag", "orange"]));
  });
});

describe("validateCommand", () => {
  it("should validate valid command", () => {
    assert.ok(utils.validateCommand("--save"));
  });

  it("should invalidate invalid command", () => {
    assert.ok(!utils.validateCommand("-save"));
  });
});

describe("existsBeverageLogs", () => {
  it("should execute of statement if file is not present", () => {
    const writeFile = function(args, initialValue, format) {
      if (args == "./beverageLogs.json" && initialValue == {} && format == "utf8") return true;
    };

    const exists = function(args) {
      if (args != "./beverageLogs.json") return false;
    };

    assert.ok(utils.existsBeverageLogs("./beverageLogs.json", writeFile, exists));
  });

  it("should not execute if statement if file is present", () => {
    const writeFile = function(args, initialValue, format) {
      if (args == "./beverageLogs.json" && initialValue == {} && format == "utf8") return true;
    };

    const exists = function(args) {
      if (args == "./beverageLogs.json") return true;
    };

    assert.ok(!utils.existsBeverageLogs("./beverageLogs.json", writeFile, exists));
  });
});

describe("getBeverageLogs", () => {
  it("should return true for correct arguments", () => {
    const readFile = function(path, format) {
      if (path == "./beverage.json" && format == "utf8") return true;
    };
    assert.ok(utils.getBeverageLogs("./beverage.json", readFile));
  });
});
