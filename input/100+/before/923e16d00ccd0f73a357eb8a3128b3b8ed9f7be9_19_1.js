function(settingName, settingValue)
  {
    return ["li",
      ["label",
        ["input",
        "type", "checkbox",
        "value", settingName,
        "checked", settingValue ?  true : false,
        "handler", "set-stop-at"
        ],
        settingName
      ]
    ]
  }