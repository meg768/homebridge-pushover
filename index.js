"use strict";

module.exports = function(homebridge) {
    homebridge.registerPlatform('homebridge-pushover', 'Pushover', require('./src/platform.js'));
};
