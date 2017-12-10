"use strict";

var Accessory = require('./accessory.js')

module.exports = class MasterSwitch extends Accessory {

    constructor(platform, config) {

        config = Object.assign({}, {name:'Pushover', model:'Pushover Master Switch', manufacturer:'Pushover', serialNumber:'MasterSwitch'}, config);

        super(platform, config);

        this.service = new this.Service.Switch(this.name);

        var characteristic = this.service.getCharacteristic(this.Characteristic.On);
        characteristic.setValue(platform.enabled);

        characteristic.on('get', (callback) => {
            callback(null, platform.enabled);
        });

        characteristic.on('set', (value, callback, context) => {
            platform.enabled = Boolean(value);
            callback();
        });
    }



    getServices() {
        var services = super.getServices();
        services.push(this.service);
        return services;
    }

};
