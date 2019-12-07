# homebridge-pushover

Sends messages via Pushover from HomeKit. Can be used in HomeKit automation 
so that you may be alerted when things happends in your home.

## Installation

First, install Homebridge. See https://www.npmjs.com/package/homebridge
for more information.

Then install this plugin.

    $ sudo npm install homebridge-pushover -g

## Configuration File

Configure your **~/.homebridge/config.json** with the following platform.


```javascript
{
    "bridge": {
        "name": "Pushover",
        "username": "CC:22:3D:F3:CE:37",
        "port": 51826,
        "pin": "031-45-154"
    },

    "description": "This is an example configuration file",

    "platforms": [
        {
            "platform": "Pushover",
            "name": "Pushover",

            "pushover": {
                "user": "your-pushover-user",
                "token": "your-pushover-token"
            },

            "messages": [
                {
                    "name": "Meddelande",
                    "message": "Meddelande",
                    "type": "masterSwitch"
                },
                {
                    "name": "Larm på",
                    "message": "Larm aktiverat"
                },
                {
                    "name": "Larm av",
                    "message": "Larm avaktiverat"
                },
                {
                    "name": "Ringklocka",
                    "message": "Det ringer på dörren",
                    "priority": "high"
                }
            ]

        }
    ]
}

```
## What This Plugin Does

This plugin simply creates buttons with text labels. When pushed to state ON
a message is sent using Pushover with the specified Pushover credentials.

The **masterSwitch** will create a button that is used to toggle
messages on or off. However, when a switch has the priority **high**, the message is always sent.

I suggest you create all your messages in the config file
and then group all messages in a seperate room named 'Messages' in HomeKit.

## Bugfixes/Updates

* 2019-01-20 - Just published on NPM.

## Useful Links

* https://pushover.net
