function(info) {
      var ret = $('<table>', {
        id: 'help_optsTable'
      })

      // headers
      if (info.o) ret.append(HelpUtils.OptionUtils.buildOptionsHeadersHTML(info))

      // options
      _.each(info.o, function(optDesc, optName) {
        ret.append(HelpUtils.OptionUtils.buildOptionHtml(optDesc, optName))
      })

      if (info.o) ret.append($('<td/>', {
        html: '<br/>'
      }))

      return ret
    }