const assert = require("chai").assert;
const performOperation = require("../src/performTransactions").performOperation;

describe("performOperation", () => {
  const writeFile = function(args, initialValue) {
    let actual = [args];
    let expected = ["./beverageLogs.json"];
    assert.deepStrictEqual(actual, expected);
    return true;
  };

  const readFile = function(path, format) {
    let expected = ["./beverageLogs.json", "utf8"];
    let actual = [path, format];
    assert.deepStrictEqual(actual, expected);
    return "[]";
  };

  const exists = function(args) {
    assert.strictEqual(args, "./beverageLogs.json");
    return false;
  };

  const fsFuncs = {
    writeFile: writeFile,
    readFile: readFile,
    existsFile: exists,
    encoding: "utf8"
  };
  it("should return invalid input for invalid transaction", () => {
    let actual = performOperation(
      ["--save", "--beverage", 1234],
      fsFuncs,
      "./beverageLogs.json",
      "date"
    );
    let expected = "invalid input";
    assert.strictEqual(actual, expected);
  });

  it("should return saved transaction for save command", () => {
    let actual = performOperation(
      ["--save", "--beverage", "orange", "--empId", "11111", "--qty", "2"],
      fsFuncs,
      "./beverageLogs.json",
      new Date("2019-10-10")
    );
    let expected =
      "Transaction Recorded:\nEmployee ID, Beverage, Quantity, Date\n11111,orange,2,2019-10-10T00:00:00.000Z";
    assert.strictEqual(actual, expected);
  });
});
