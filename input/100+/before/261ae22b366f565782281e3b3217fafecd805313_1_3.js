function(info) {
        var ret = $('<td>')
        ret.addClass('help_title')
        ret.text(info.t.firstLetterUpper())

        var description = (info.d && _.escape(info.d).formatLineBreaks()) || ''
        var optsTable = HelpUtils.buildOptionsHTML(info)

        // table for description + options
        $('<table>').css({
          'margin-left': 10,
          'width': '100%'
        }).append($('<tr>').append(

        // description
        $('<td/>', {
          html: description,
          'class': 'help_desc'
        })), $('<tr>').append(

        // create options label + append options table
        $('<td>').text((info.o && 'Options') || '').addClass('help_optsLabel').append(optsTable))).appendTo(ret)

        return ret
      }