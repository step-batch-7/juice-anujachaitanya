const generateStorePath = function(env) {
  return env.JUICE_TRANSACTIONS_STORE_PATH || "./beverageLogs.json";
};

const generateDate = function(env) {
  stubbedDate = new Date(env.NOW);
  isValidNOW = Number.isNaN(stubbedDate.getTime());
  date = isValidNOW ? new Date() : stubbedDate;
  return date;
};

exports.generateStorePath = generateStorePath;
exports.generateDate = generateDate;
