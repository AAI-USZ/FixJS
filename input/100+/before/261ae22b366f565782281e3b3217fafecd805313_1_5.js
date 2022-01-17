function(commands, categoryName) {

        // table for current command
        var tbl = $('<table>')
        _.each(commands, function(info, commandName) {
          tbl.append(HelpUtils.CommandUtils.buildCommandHTML(info))
        })

        // main table
        ret.append(
        $('<tr>').append(

        $('<td>').append(
        // add category
        $('<h2/>', {
          'class': 'help_categoryTitle',
          text: categoryName.firstLetterUpper()

          // append commands to category
        }).append(tbl))))

      }