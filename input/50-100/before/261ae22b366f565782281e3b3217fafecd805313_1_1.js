function(info) {
      var ret = $('<table>')
      ret.addClass('help_optTable')

      // headers
      if (info.o) ret.append(HelpUtils.OptionUtils.buildOptionsHeadersHTML(info))

      // options
      _.each(info.o, function(optDesc, optName) {
        ret.append(HelpUtils.OptionUtils.buildOptionHtml(optDesc, optName))
      })

      return ret
    }