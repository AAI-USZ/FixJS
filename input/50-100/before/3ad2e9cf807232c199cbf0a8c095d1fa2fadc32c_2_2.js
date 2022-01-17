function require(id) {
      var uri = resolve(id, module.uri)
      var child = cachedModules[uri]

      // Just return null when:
      //  1. the module file is 404.
      //  2. the module file is not written with valid module format.
      //  3. other error cases.
      if (!child || child.status < STATUS.LOADED) {
        return null
      }

      if (isCircular(child)) {
        return child.exports
      }

      child.parent = module
      return child._compile()
    }