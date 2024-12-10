const util = require("util");
const jwt = require("jsonwebtoken");

const sign = util.promisify(jwt.sign);
const verify = util.promisify(jwt.verify);

const jwtService = { sign, verify };

module.exports = jwtService;
