const os = require('os');
const path = require('path');

console.log("hi");

const keypath = path.join(os.homedir(), ".apikey.json");

console.log(keypath);

const blah = require(keypath);
