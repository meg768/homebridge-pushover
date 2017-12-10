"use strict";

var Accessory = require('./accessory.js')
var Timer = require('./timer.js');

module.exports = class Switch extends Accessory {

    constructor(platform, config) {

        config = Object.assign({}, {name:config.message, model:'Pushover Message', manufacturer:'Pushover', serialNumber:config.id}, config);

        super(platform, config);

        this.log('New message:', this.name);
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

                characteristic.updateValue(true);
                platform.pushover(this.name);

                timer.setTimer(2000, () => {
                    characteristic.updateValue(false);
                });

            }

            callback();
        });


    }



    getServices() {
        var services = super.getServices();
        services.push(this.service);
        return services;
    }

};
