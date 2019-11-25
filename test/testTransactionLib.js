const assert = require("assert");
const save = require("../src/transactionLib").save;
const query = require("../src/transactionLib").query;

describe("save", () => {
  it("should insert new empId with records", () => {
    let actual = save({ empId: 25313, beverage: "orange", qty: 1 }, {});
    let expected = {
      25313: {
        orders: [{ beverage: "orange", qty: 1, time: actual["25313"]["orders"][0]["time"] }],
        total: 1
      }
    };
    assert.deepStrictEqual(actual, expected);
  });

  it("should update the record for existing empId", () => {
    let actual = save(
      { empId: 25313, beverage: "pepsi", qty: 1 },
      { 25313: { orders: [{ beverage: "orange", qty: 1, time: 11 }], total: 1 } }
    );
    let expected = {
      25313: {
        orders: [
          { beverage: "orange", qty: 1, time: 11 },
          { beverage: "pepsi", qty: 1, time: actual["25313"]["orders"][1]["time"] }
        ],
        total: 2
      }
    };
    assert.deepStrictEqual(actual, expected);
  });
});

describe("query", () => {
  it("should return all details of given empId", () => {
    let actual = query(
      { empId: 25313 },
      {
        25313: {
          orders: [{ beverage: "orange", qty: 1, time: 11 }],
          total: 1
        }
      }
    );

    let expected = [["orange", 1, 11]];
    assert.deepStrictEqual(actual, expected);
  });

  it("should return more than one records of given empId", () => {
    let actual = query(
      { empId: 25313 },
      {
        25313: {
          orders: [
            { beverage: "orange", qty: 1, time: 11 },
            { beverage: "watermelon", qty: 2, time: 11 }
          ],
          total: 3
        }
      }
    );

    let expected = [
      ["orange", 1, 11],
      ["watermelon", 2, 11]
    ];
    assert.deepStrictEqual(actual, expected);
  });
});
