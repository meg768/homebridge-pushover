"use strict";

var Path = require('path');

module.exports = function(homebridge) {

    var path = homebridge.user.storagePath();

//    if (typeof process.env.HOME === 'string')
//        require('dotenv').config({path: Path.join(process.env.HOME, '.homebridge/.env')});
    
    if (path === 'string')
        require('dotenv').config({path: Path.join(path, '.env')});
    
        homebridge.registerPlatform('homebridge-pushover', 'Pushover', require('./src/platform.js'));
};
