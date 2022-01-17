f      var len = data.trim().length
        , js = data.split('{').length
        , html = data.split(/<\s*\w+/).length

      if (len === 0) return 'zero-lenth source'
      if (js < html) return 'source looks like HTML'
    }
