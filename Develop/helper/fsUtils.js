const fs = require('fs');
const util = require('util');

var readFromFile = util.promisify(fs.readFile);

module.exports = {readFromFile};