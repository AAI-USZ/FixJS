f      var len = data.trim().length
        , js = data.split('{').length
        , html = data.split(/<\s*\w+/).length

      if (len === 0) return 'zero-length source'
      if (js < html && data.indexOf("<html>") > -1) return 'source looks like HTML'
    }
