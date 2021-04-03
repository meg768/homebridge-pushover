"use strict";

var Path = require('path');

module.exports = function(homebridge) {

    var path = homebridge.user.storagePath();

    if (path === 'string')
        require('dotenv').config({path: Path.join(path, '.env')});
    
    homebridge.registerPlatform('homebridge-pushover', 'Pushover', require('./src/platform.js'));
};
