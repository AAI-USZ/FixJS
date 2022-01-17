function(source) {
      for (key in source)
        if (source[key] !== undefined)
          target[key] = source[key]
    }