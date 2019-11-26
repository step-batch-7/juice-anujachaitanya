const assert = require("assert");
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
    let expected = { beverage: "orange", qty: 1, command: "save", empId: 25313 };
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
    let expected = { beverage: "orange", qty: 1, command: "save", empId: undefined };
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
    assert.ok(!inputHandler.checkOptForSave(input));
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
    assert.ok(!inputHandler.areEnoughOptions(input));
  });
});

describe("createObjectForTransaction", () => {
  it("should return object for given details", () => {
    let actual = inputHandler.createObjectForTransaction(["--query", "--empId", 25313]);
    let expected = { command: "query", empId: 25313, beverage: undefined, qty: undefined };
    assert.deepStrictEqual(actual, expected);
  });
});
