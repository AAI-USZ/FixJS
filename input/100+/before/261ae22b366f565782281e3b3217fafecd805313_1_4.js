function(info) {

        var keys = _.escape(((_.isString(info.k) && info.k) || info.k.join(" ")))

        // row for a command
        return $('<tr>').addClass('help_row').append(

        // has options
        $('<td/>', {
          text: (info.o && ' {O}') || '',
          'class': 'help_hasOptions'
        }),

        // server
        $('<td/>', {
          text: (info.s && ' {S}') || '',
          'class': 'help_server'
        }),

        // count
        $('<td/>', {
          text: (info.c && '{C}') || '',
          'class': 'help_count'
        }),

        // keys
        $('<td/>', {
          html: keys + '&nbsp;',
          'class': 'help_keyShortcut'
        }),

        // title + description + options
        HelpUtils.CommandUtils.buildCommandDetailsHTML(info))
      }