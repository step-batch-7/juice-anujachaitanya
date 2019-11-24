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
