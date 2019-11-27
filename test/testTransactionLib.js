const assert = require("assert");
const save = require("../src/transactionLib").save;
const query = require("../src/transactionLib").query;

describe("save", () => {
  it("should return transaction details after saving it", () => {
    const writeFile = function(path, beverageLogs) {
      return undefined;
    };
    let actual = save(
      { beverage: "orange", empId: 25313, qty: 2 },
      [],
      23,
      "./beverage.json",
      writeFile
    );
    let expected = { empId: 25313, beverage: "orange", qty: 2, date: 23 };
    assert.deepStrictEqual();
  });
});

describe("query", () => {
  it("should return beverageLogs for given empId", () => {
    let actual = query({ empId: 25313 }, [{ empId: "25313" }, { empId: "25313" }]);
    let expected = [["25313"], ["25313"], NaN];
    assert.deepStrictEqual(actual, expected);
  });

  it("should return no entries for unknown empId", () => {
    let actual = query({ empId: 25313 }, []);
    let expected = "no entries";
    assert.strictEqual(actual, expected);
  });
});
