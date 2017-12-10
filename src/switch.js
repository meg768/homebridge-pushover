"use strict";

var Accessory = require('./accessory.js')

module.exports = class Switch extends Accessory {

    constructor(platform, config) {

        config = Object.assign({}, {name:config.message, model:'Pushover Message', manufacturer:'Pushover', serialNumber:config.id}, config);

        super(platform, config);

        this.service = new this.Service.Switch(this.name);

        var characteristic = this.service.getCharacteristic(this.Characteristic.On);

        characteristic.on('get', (callback) => {
            callback(null, false);
        });

        characteristic.on('set', (value, callback, context) => {

            if (value) {
                characteristic.updateValue(true);

                platform.pushover(this.name).then(() => {
                })
                .catch((error) => {
                    this.log(error);
                })
                .then(() => {
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
