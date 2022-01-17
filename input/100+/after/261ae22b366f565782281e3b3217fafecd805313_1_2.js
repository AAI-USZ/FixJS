function(optDesc, optName) {

        var defaultValue = Option.defaultOptions[optName]
        defaultValue = stringify(defaultValue)

        var optValue = Option.get(optName)
        optValue = stringify(optValue)
        optValue = (optValue == defaultValue && ' ') || optValue

        if (!_.isNumber(defaultValue)) defaultValue = defaultValue || ""

        if (!_.isNumber(optValue)) optValue = optValue || ""

        return $('<tr>').append(

        // option name
        $('<td/>', {
          text: optName,
          'class': 'help_optName'
        }),

        // option default
        $('<td/>', {
          html: defaultValue.toString().formatLong(15, 'help_optDefault'),
          'class': 'help_optDefault'
        }),

        // option value
        $('<td/>', {
          html: optValue.toString().formatLong(15, 'help_optValue'),
          'class': 'help_optValue'
        }),

        // option description
        $('<td/>', {
          html: '&nbsp;' + optDesc.firstLetterUpper().formatLineBreaks(),
          'class': 'help_optDesc'
        }))
      }