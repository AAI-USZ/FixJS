function(uri) {
        var module = cachedModules[uri]
        return module ? module._compile() : null
      }