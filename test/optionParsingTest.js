const assert = require("chai").assert;
const {
  createObjectForTransaction,
  createObjectForValidation,
  transformDataToArray
} = require("../src/optionParsing");
describe("createObjectForValidation", () => {
  it("should return object for given transaction", () => {
    let actual = createObjectForValidation([
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
      empId: 25313,
      beverage: "orange",
      qty: 8
    };
    assert.deepStrictEqual(actual, expected);
  });
});

describe("createObjectForTransaction", () => {
  it("should delete the command key from transaction", () => {
    let actual = createObjectForTransaction({ empId: "2903", command: "query" });
    let expected = { empId: "2903" };
    assert.deepStrictEqual(actual, expected);
  });
});

describe("transformDataToArray ", () => {
  it("should convert given data into array of array", () => {
    let actual = transformDataToArray(["--save", "--beverage", "orange", "--qty", 1]);
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
