const generateStorePath = function(env) {
  return env.JUICE_TRANSACTIONS_STORE_PATH || "./beverageLogs.json";
};

const generateDate = function(env) {
  stubbedDate = new Date(env.NOW);
  date = stubbedDate.getTime() == NaN ? stubbedDate : new Date();
  return date;
};

exports.generateStorePath = generateStorePath;
exports.generateDate = generateDate;
