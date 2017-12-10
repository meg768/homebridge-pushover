"use strict";

module.exports = class Accessory {

    constructor(platform, config) {
        if (!config.name)
            throw new Error('An accessory name must be specified');

        this.log = platform.log;
        this.platform = platform;
        this.config = config;
        this.homebridge = platform.homebridge;
        this.Characteristic = platform.homebridge.hap.Characteristic;
        this.Service = platform.homebridge.hap.Service;
        this.name = config.name;
    }



    getServices() {
        var service = new this.Service.AccessoryInformation();

        if (this.config.manufacturer)
            service.setCharacteristic(this.Characteristic.Manufacturer, this.config.manufacturer);

        if (this.config.model)
            service.setCharacteristic(this.Characteristic.Model, this.config.model);

        if (this.config.serialNumber)
            service.setCharacteristic(this.Characteristic.SerialNumber, this.config.serialNumber);

        return [service];
    }

};
