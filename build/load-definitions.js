const os = require('os');
const path = require('path');
const _ = require('lodash');

const keypath = path.join(os.homedir(), ".apikey.json");

// When using DefinePlugin you have to double-layer the quotes because it's
// a direct text replacement like a C macro.
// You also have to update the external-definitions.d.ts file.
function loadDefinitions() {
    const originalStructure = require(keypath);
    const doubleLayered = _.mapValues(originalStructure, JSON.stringify)
    return doubleLayered;
}


module.exports = loadDefinitions;

