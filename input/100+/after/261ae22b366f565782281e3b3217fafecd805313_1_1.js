function(info) {
        // hide default column if we don't have default options pre-defined
        var hasDefaultOptions = false;
        _.each(info.o, function(optDesc, optName) {
          if (!hasDefaultOptions && Option.defaultOptions[optName] !== undefined) {
            hasDefaultOptions = true;
          }
        })

        return $('<tr>').append(

        $('<td/>', {
          text: 'Name',
          'class': 'help_optHeader'
        }),

        $('<td/>', {
          text: (hasDefaultOptions && 'Default') || '',
          'class': 'help_optHeader'
        }),

        $('<td/>', {
          html: 'Value&nbsp;&nbsp;',
          'class': 'help_optHeader'
        }),

        $('<td/>', {
          text: 'Description',
          'class': 'help_optHeader'
        }))
      }