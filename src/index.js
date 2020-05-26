/*
 * index.js
 */

const v8 = require('./v8')

const defaultVersion = v8;

defaultVersion.v8 = v8;

module.exports = defaultVersion;
