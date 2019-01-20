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
                {"name": "Larm aktiverat", "priority":"high" },
                {"name": "Larm avaktiverat", "priority":"high" },
                {"name": "Rörelse i biorummet" },
                {"name": "Rörelse på kontoret" },
                {"name": "Rörelse i vardagsrummet"},
                {"name": "Rörelse i snickarrummet"},
                {"name": "Rörelse i matrummet"},
                {"name": "Terassen tänd"},
                {"name": "Terassen släckt"},
                {"name": "Det ringer på dörren", "priority":"high"},
                {"name": "Jag har lämnat huset", "priority":"high"},
                {"name": "Jag är hemma!", "priority":"high"}
            ]

        }
    ]


}
