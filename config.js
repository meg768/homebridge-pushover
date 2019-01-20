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

            "masterSwitch": {
                "name": "Meddelande"
            },

            "switches": [
                {"message": "Larm aktiverat", "priority":"high" },
                {"message": "Larm avaktiverat", "priority":"high" },
                {"message": "Rörelse i biorummet" },
                {"message": "Rörelse på kontoret" },
                {"message": "Rörelse i vardagsrummet"},
                {"message": "Rörelse i snickarrummet"},
                {"message": "Rörelse i matrummet"},
                {"message": "Terassen tänd"},
                {"message": "Terassen släckt"},
                {"message": "Det ringer på dörren", "priority":"high"},
                {"message": "Jag har lämnat huset", "priority":"high"},
                {"message": "Jag är hemma!", "priority":"high"}
            ]

        }
    ]


}
