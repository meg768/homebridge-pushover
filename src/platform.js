"use strict";

var Pushover = require('pushover-notifications');
var Switch = require('./switch.js');

module.exports = class Platform {

    constructor(log, config, homebridge) {
        this.config = config;
        this.log = log;
        this.homebridge = homebridge;
    }

    pushover(message) {
        var push = new Pushover(config.pushover);

        this.log('Sending message:', message);

        push.send({priority:0, message:message}, function(error, result) {
            if (error) {
                this.log('Failed to send message.', error.message);
            }
        });
    }

    accessories(callback) {
        this.log('Loading accessories...');

        var accessories = [];

        this.config.messages.forEach((item) => {
            accessories.push(new Switch(this, config));
        });

        callback(accessories);

    }
}
