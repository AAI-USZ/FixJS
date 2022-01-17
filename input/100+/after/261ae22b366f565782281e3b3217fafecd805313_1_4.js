function(info) {

        var keys = _.escape(((_.isString(info.k) && info.k) || info.k.join(" ")))

        // row for a command
        return $('<tr>').append(

        // has options
        $('<td/>', {
          html: (info.o && '&nbsp; O') || '',
          'class': 'help_hasOptions'
        }),

        // server
        $('<td/>', {
          html: (info.s && '&nbsp; S') || '',
          'class': 'help_server'
        }),

        // count
        $('<td/>', {
          html: (info.c && '&nbsp;C') || '',
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