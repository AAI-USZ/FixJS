function(uri) {
      return uri && (!cachedModules[uri] ||
          cachedModules[uri].status < STATUS.LOADED)
    }