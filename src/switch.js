"use strict";

var Accessory = require('./accessory.js')

module.exports = class Switch extends Accessory {

    constructor(platform, config) {

        var {type, name, pushprio, title, message, type, priority, model = 'Pushover Message', manufacturer = 'Pushover', serialNumber = '1.0'} = config;

        if (message == undefined) {
            throw new Error(`Please specify a message.`);
        }

        if (name == undefined)
            name = message;
        
        if (title == undefined)
            title = name;
            
        if (pushprio == undefined)
            pushprio = 0;
        
        if (pushprio > 1)
            pushprio = 1;
        
        if (pushprio < -2)
            pushprio = -2;

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
    
                    if (this.platform.enabled || priority == 'high') {
                        platform.pushover(message).then(() => {
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
