"use strict";

module.exports = class Accessory {

    constructor(platform, config) {
        this.log = platform.log;
        this.config = config;
        this.homebridge = platform.homebridge;
        this.Characteristic = platform.homebridge.hap.Characteristic;
        this.Service = platform.homebridge.hap.Service;
        this.name = config.name;
    }



    getServices() {
        var service = new this.Service.AccessoryInformation();

        if (this.config.manufacturer)
            accessoryInfo.setCharacteristic(this.Characteristic.Manufacturer, this.config.manufacturer);

        if (this.config.model)
            accessoryInfo.setCharacteristic(this.Characteristic.Model, this.config.model);

        if (this.config.serialNumber)
            accessoryInfo.setCharacteristic(this.Characteristic.SerialNumber, this.config.serialNumber);

        return [service];
    }

};
