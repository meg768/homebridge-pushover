"use strict";

var Path = require('path');
var isString = require('yow/isString');

module.exports = function(homebridge) {

    // Load .env if HOME defined
    if (typeof process.env.HOME === 'string')
        require('dotenv').config({path: Path.join(process.env.HOME, '.homebridge/.env')});

    homebridge.registerPlatform('homebridge-pushover', 'Pushover', require('./src/platform.js'));
};
