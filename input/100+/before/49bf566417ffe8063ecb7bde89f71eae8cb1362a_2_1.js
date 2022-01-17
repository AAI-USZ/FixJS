function() {
    var module = this
    if (module.status === STATUS.COMPILED) {
      return module.exports
    }

    // Just return null when:
    //  1. the module file is 404.
    //  2. the module file is not written with valid module format.
    //  3. other error cases.
    if (module.status < STATUS.READY) {
      return null
    }

    module.status = STATUS.COMPILING


    function require(id) {
      var uri = resolve(id, module.uri)
      var child = cachedModules[uri]

      // Just return null when uri is invalid.
      if (!child) {
        return null
      }

      // Avoids circular calls.
      if (child.status === STATUS.COMPILING) {
        return child.exports
      }

      child.parent = module
      return child._compile()
    }

    require.async = function(ids, callback) {
      module._use(ids, callback)
    }

    require.resolve = function(id) {
      return resolve(id, module.uri)
    }

    require.cache = cachedModules


    module.require = require
    module.exports = {}
    var factory = module.factory

    if (util.isFunction(factory)) {
      compileStack.push(module)
      runInModuleContext(factory, module)
      compileStack.pop()
    }
    else if (factory !== undefined) {
      module.exports = factory
    }

    module.status = STATUS.COMPILED
    execModifiers(module)
    return module.exports
  }