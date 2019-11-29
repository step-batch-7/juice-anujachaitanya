const chai = require("chai");
const assert = chai.assert;
const inputHandler = require("../src/inputHandlingLib");

describe("transformDataToArray ", () => {
  it("should convert given data into array of array", () => {
    let actual = inputHandler.transformDataToArray(["--save", "--beverage", "orange", "--qty", 1]);
    let expected = [
      [
        ["--beverage", "orange"],
        ["--qty", 1]
      ],
      "--save"
    ];
    assert.deepStrictEqual(actual, expected);
  });
});

describe("transformDataIntoObj", () => {
  it("should transform the given data into object", () => {
    let actual = inputHandler.transformDataIntoObj([
      [
        ["--beverage", "orange"],
        ["--qty", 1],
        ["--empId", 25313]
      ],
      "--save"
    ]);
    let expected = { beverage: "orange", qty: 1, command: "save", empId: 25313, date: undefined };
    assert.deepStrictEqual(actual, expected);
  });

  it("should transform given data to object if one element is undefined", () => {
    let actual = inputHandler.transformDataIntoObj([
      [
        ["--beverage", "orange"],
        ["--qty", 1]
      ],
      "--save"
    ]);
    let expected = {
      beverage: "orange",
      qty: 1,
      command: "save",
      empId: undefined,
      date: undefined
    };
    assert.deepStrictEqual(actual, expected);
  });
});

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
    let input = { beverage: "orange", empId: 2323, qty: 12 };
    assert.ok(inputHandler.checkOptForSave(input));
  });

  it("should invalidate invalid values for beverage", () => {
    let input = { beverage: 2313, empId: "anuja", qty: "1a2" };
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

describe("createObjectForTransaction", () => {
  it("should remove command key", () => {
    let actual = inputHandler.createObjectForTransaction({ command: "query", empId: "25313" });
    let expected = {
      empId: "25313"
    };
    assert.deepStrictEqual(actual, expected);
  });

  it("should remove unnecessary keys from the object", () => {
    let actual = inputHandler.createObjectForTransaction({ empId: "25313", beverage: undefined });
    let expected = {
      empId: "25313"
    };
    assert.deepStrictEqual(actual, expected);
  });
});

describe("createObjectForValidation", () => {
  it("should return object for given transaction", () => {
    let actual = inputHandler.createObjectForValidation([
      "--save",
      "--empId",
      25313,
      "--beverage",
      "orange",
      "--qty",
      8
    ]);
    let expected = {
      command: "save",
      date: undefined,
      empId: 25313,
      beverage: "orange",
      qty: 8
    };
    assert.deepStrictEqual(actual, expected);
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
