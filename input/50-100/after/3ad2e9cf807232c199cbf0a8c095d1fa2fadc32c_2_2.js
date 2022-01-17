function require(id) {
      var uri = resolve(id, module.uri)
      var child = cachedModules[uri]

      // Just return null when uri is invalid.
      if (!child) {
        return null
      }

      if (isCircular(child)) {
        return child.exports
      }

      child.parent = module
      return child._compile()
    }