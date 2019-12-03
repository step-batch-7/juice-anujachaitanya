const chai = require("chai");
const assert = chai.assert;
const inputHandler = require("../src/inputValidation");

describe("isValidTransaction", () => {
  it("should validate transaction", () => {
    let actual = inputHandler.isValidTransaction([
      "--save",
      "--beverage",
      "orange",
      "--qty",
      1,
      "--empId"
    ]);
    let expected = true;
    assert.deepStrictEqual(actual, expected);
  });

  it("should invalidate transaction for invalid options", () => {
    let actual = inputHandler.isValidTransaction(["--date", "--qty", 1]);
    let expected = false;
    assert.strictEqual(actual, expected);
  });
});

describe("checkOptForSave", () => {
  it("should validate all options for save", () => {
    let input = { command: "save", beverage: "orange", empId: 2323, qty: 12 };
    assert.ok(inputHandler.checkOptForSave(input));
  });

  it("should invalidate invalid values for beverage", () => {
    let input = { command: "save", beverage: 2313, empId: "anuja", qty: "1a2" };
    assert.notOk(inputHandler.checkOptForSave(input));
  });
});

describe("checkOptForQuery", () => {
  it("should validate all options for query", () => {
    let input = { empId: 25313 };
    assert.ok(inputHandler.checkOptForQuery(input));
  });
});

describe("areEnoughOptions", () => {
  it("should invalidate incorrect no of arguments", () => {
    let input = ["--query", "--empId", "anuja"];
    assert.notOk(inputHandler.areEnoughOptions(input));
  });
});
describe("isValidDate", () => {
  it("should validate if date is undefined", () => {
    assert.ok(inputHandler.isValidDate(undefined));
  });

  it("should validate correct date", () => {
    assert.ok(inputHandler.isValidDate("2019-10-19"));
  });
});
