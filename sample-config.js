{
    "bridge": {
        "name": "Pushover",
        "username": "CC:22:3D:E3:CE:37",
        "port": 51826,
        "pin": "031-45-154"
    },

    "description": "This is an example configuration file",

    "platforms": [
        {
            "platform": "Pushover",
            "name": "Pushover",

            "pushover": {
                "user": "u1mrd1fpevhm8opcbhywcmmdst7qja",
                "token": "amctdgksyefuqxavyuttsh2pcg4ejp"
            },

            "masterSwitch": {
                "name": "Meddelande"
            },

            "switches": [
                {"id": "LA",   "message": "Larm aktiverat." },
                {"id": "LV",   "message": "Larm avaktiverat." },
                {"id": "RIB",  "message": "Rörelse i biorummet." },
                {"id": "RPK",  "message": "Rörelse på kontoret." },
                {"id": "RIV",  "message": "Rörelse i vardagsrummet."}

            ]
        }
    ]


}
