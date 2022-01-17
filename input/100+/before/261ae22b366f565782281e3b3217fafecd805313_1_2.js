function(optDesc, optName) {

        var defaultValue = Option.defaultOptions[optName]
        if (_.isArray(defaultValue)) {
          defaultValue = defaultValue.join(", ")
        } else if (_.isObject(defaultValue)) {
          defaultValue = JSON.stringify(defaultValue)
        }

        var optValue = Option.get(optName)
        optValue = (_.isArray(optValue) && optValue.join(", ")) || optValue
        optValue = (optValue == defaultValue && ' ') || optValue

        return $('<tr>').append(

        // option name
        $('<td/>', {
          text: optName,
          'class': 'help_optName'
        }),

        // option name
        $('<td/>', {
          text: defaultValue,
          'class': 'help_optDefault'
        }),

        // option value
        $('<td/>', {
          text: optValue,
          'class': 'help_optValue'
        }),

        // option description
        $('<td/>', {
          text: optDesc.firstLetterUpper().formatLineBreaks(),
          'class': 'help_optDesc'
        }))
      }