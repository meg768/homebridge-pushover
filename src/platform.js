"use strict";

var Pushover = require('pushover-notifications');
var Switch = require('./switch.js');
var MasterSwitch = require('./master-switch.js');

module.exports = class Platform {

    constructor(log, config, homebridge) {
        this.config = config;
        this.log = log;
        this.homebridge = homebridge;
        this.enabled = true;
    }

    pushover(message) {
        try {
            if (this.enabled) {
                if (!this.config.pushover)
                    throw new Error('You must configure Pushover credentials.');

                if (!this.config.pushover.user)
                    throw new Error('You must configure Pushover user.');

                if (!this.config.pushover.token)
                    throw new Error('You must configure Pushover token.');

                var push = new Pushover(this.config.pushover);

                this.log('Sending message:', message);

                push.send({priority:0, message:message}, function(error, result) {
                    if (error) {
                        this.log('Failed to send message.', error.message);
                    }
                });
            }

        }
        catch (error) {
            this.log(error);
        }
    }

    accessories(callback) {
        var accessories = [];

        if (this.config.masterSwitch)
            accessories.push(new MasterSwitch(this, this.config.masterSwitch));

        this.config.switches.forEach((item) => {
            accessories.push(new Switch(this, item));
        });

        callback(accessories);

    }
}
