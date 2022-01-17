function() {

      // table for all commands
      var ret = $('<table>', {
        id: 'vromeHelpGiantTable'
      })
      _.each(ncmds, function(commands, categoryName) {

        // table for current command
        ret.append(
        $('<tr>').append(
        $('<td/>', {
          html: '<br/><br/>'
        })))

        ret.append(
        $('<tr>').append(
        $('<td/>'), $('<td/>'), $('<td/>'), $('<td/>'),

        $('<td>').append(
        // add category
        $('<h2/>', {
          text: categoryName.firstLetterUpper()
        })).addClass('help_categoryTitle')))

        _.each(commands, function(info, commandName) {
          ret.append(HelpUtils.CommandUtils.buildCommandHTML(info))
        })
        // main table
      })

      return ret
    }