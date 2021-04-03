"use strict";

var Accessory = require('./accessory.js')

module.exports = class Switch extends Accessory {

    constructor(platform, config) {

        var {type, name, message, type, title, expire = 3600, retry = 60, priority, model = 'Pushover Message', manufacturer = 'Pushover', serialNumber = '1.0'} = config;

        if (message == undefined) {
            throw new Error(`Please specify a message.`);
        }

        if (name == undefined)
            name = message;

		// Translate priority strings to Pushover priority values
		if (typeof priority == 'string') {

			var priorities = {
				'lowest':-2,
				'low': -1,
				'normal': 0,
				'high': 1,
				'emergency': 2 
			};

			priority = priorities[priority];
		}

		if (typeof priority != 'number')
			priority = 0;

        super(platform, {name:name, model:model, manufacturer:manufacturer, serialNumber:serialNumber});

        this.service = new this.Service.Switch(this.name);
        var characteristic = this.service.getCharacteristic(this.Characteristic.On);
        var state = (type == 'masterSwitch') ? true : false;

        characteristic.on('get', (callback) => {
            callback(null, state);
        });

        characteristic.on('set', (value, callback) => {

            if (type == 'masterSwitch') {
                this.platform.enabled = state = Boolean(value);
            }
            else {
                if (value) {
                    characteristic.updateValue(state = true);
    
                    if (this.platform.enabled || priority > 0) {
                        platform.pushover({priority:priority, message:message, title:title, retry:retry, expire:expire}).then(() => {
                            this.log('Message sent:', message);
                        })
                        .catch((error) => {
                            this.log(error);
                        })
                        .then(() => {
                            characteristic.updateValue(state = false);
                        });
    
                    }
                    else {
                        setTimeout(() => {
                            characteristic.updateValue(state = false);
                        }, 500);
                    }
    
                }
    

                
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
