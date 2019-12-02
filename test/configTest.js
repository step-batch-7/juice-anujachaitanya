const assert = require("assert");
const { generateStorePath, generateDate } = require("../src/config");

describe("getDataStorePath", function() {
  it("should pick the path from the env variable", () => {
    const env = { JUICE_TRANSACTIONS_STORE_PATH: "data.json" };
    assert.strictEqual(generateStorePath(env), "data.json");
  });
  it("should give default path when not configured", () => {
    const env = {};
    assert.strictEqual(generateStorePath(env), "./beverageLogs.json");
  });
});
describe("timeStamp", function() {
  it("should give current time by default", function() {
    assert.deepStrictEqual(generateDate({}), new Date());
  });
  it("should give stubbed time from env variable", function() {
    const stubbedDate = new Date("2019-01-01");
    const env = { NOW: stubbedDate.toJSON() };
    assert.deepStrictEqual(generateDate(env), stubbedDate);
  });
});
