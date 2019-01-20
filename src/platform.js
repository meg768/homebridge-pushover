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

        if (process.env.PUSHOVER_USER && process.env.PUSHOVER_TOKEN) {
            this.log('Using Pushover credentials from .env');

            config.pushover = {
                user: process.env.PUSHOVER_USER,
                token: process.env.PUSHOVER_TOKEN
            };
        }

    }

    pushover(message) {
        return new Promise((resolve, reject) => {
            try {
                if (!this.config.pushover)
                    throw new Error('You must configure Pushover credentials.');

                if (!this.config.pushover.user)
                    throw new Error('You must configure Pushover user.');

                if (!this.config.pushover.token)
                    throw new Error('You must configure Pushover token.');

                var push = new Pushover(this.config.pushover);

                this.log('Sending message:', message);

                push.send({priority:0, message:message}, (error, result) => {
                    if (error)
                        reject(error);
                    else
                        resolve();
                });
            }
            catch (error) {
                reject(error);
            }

        });
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
