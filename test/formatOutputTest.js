const assert = require("chai").assert;
const format = require("../src/formatOutput");

describe("formatOutputForQuery", () => {
  it("shoulf return formatted output for query functions", () => {
    let actual = format.formatOutputForQuery([
      { empId: 28839, beverage: "orange", qty: 1, date: "2019-01-10" }
    ]);
    let expected =
      "Employee ID, Beverage, Quantity, Date\n28839,orange,1,2019-01-10\nTotal: 1 Juice";
    assert.strictEqual(actual, expected);
  });

  it("should return Juices for more than two beverages", () => {
    let actual = format.formatOutputForQuery([
      { empId: 28839, beverage: "orange", qty: 2, date: "2019-01-10" }
    ]);
    let expected =
      "Employee ID, Beverage, Quantity, Date\n28839,orange,2,2019-01-10\nTotal: 2 Juices";
    assert.strictEqual(actual, expected);
  });
});

describe("formatOutputForSave", () => {
  it("should return saved transaction in format", () => {
    let actual = format.formatOutputForSave({
      empId: 28839,
      beverage: "orange",
      qty: 1,
      date: new Date("2019-10-10")
    });
    let expected =
      "Transaction Recorded:\nEmployee ID, Beverage, Quantity, Date\n28839,orange,1,2019-10-10T00:00:00.000Z";
  });
});
