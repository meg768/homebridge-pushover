"use strict";

var Timer = require('./timer.js');

module.exports = class Switch {

    constructor(platform, config) {
        this.log = platform.log;
        this.config = config;
        this.homebridge = platform.homebridge;
        this.Characteristic = platform.homebridge.hap.Characteristic;
        this.Service = platform.homebridge.hap.Service;
        this.name = config.message;
        this.service = new this.Service.Switch(this.name);

        var characteristic = this.service.getCharacteristic(this.Characteristic.On);
        var state = false;
        var timer = new Timer();

        characteristic.on('get', (callback) => {
            callback(null, state);
        });

        characteristic.on('set', (value, callback, context) => {

            if (value) {
                timer.cancel();

                platform.pushover(this.name);

                timer.setTimer(2000, () => {
                    characteristic.updateValue(false);
                });

            }

            callback();
        });


    }



    getServices() {
        var accessoryInfo = new this.Service.AccessoryInformation();

        accessoryInfo.setCharacteristic(this.Characteristic.Manufacturer, 'Pushover');
        accessoryInfo.setCharacteristic(this.Characteristic.Model, 'Pushover 1.0');
        accessoryInfo.setCharacteristic(this.Characteristic.SerialNumber, this.config.id);

        return [accessoryInfo, this.service];
    }

};
