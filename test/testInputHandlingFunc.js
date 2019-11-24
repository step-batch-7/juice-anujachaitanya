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
