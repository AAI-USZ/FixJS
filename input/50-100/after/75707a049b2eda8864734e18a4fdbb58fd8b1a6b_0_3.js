function (item) {
        if (!that.strings)
          item = item[that.options.property]
        
        return that.matcher(item)
      }