function(seajs, util, config) {

  var cachedModules = {}
  var cachedModifiers = {}
  var compileStack = []

  var STATUS = {
    'FETCHING': 1, // The module file is fetching now.
    'FETCHED': 2,  // The module file has been fetched.
    'SAVED': 3,    // The module info has been saved.
    'READY': 4,    // All dependencies and self are ready to compile.
    'COMPILED': 5  // The module.exports is available.
  }


  function Module(uri, status) {
    this.uri = uri
    this.status = status || 0

    // this.id is set when saving
    // this.factory is set when saving
    // this.uri is set when saving
    // this.exports is set when compiling
    // this.parent is set when compiling
  }


  Module.prototype._use = function(ids, callback) {
    util.isString(ids) && (ids = [ids])
    var uris = resolve(ids, this.uri)

    this._load(uris, function() {
      var args = util.map(uris, function(uri) {
        return cachedModules[uri]._compile()
      })

      if (callback) {
        callback.apply(null, args)
      }
    })
  }


  Module.prototype._load = function(uris, callback) {
    var unLoadedUris = util.filter(uris, function(uri) {
      return uri && (!cachedModules[uri] ||
          cachedModules[uri].status < STATUS.READY)
    })

    var length = unLoadedUris.length
    if (length === 0) {
      callback()
      return
    }

    var remain = length

    for (var i = 0; i < length; i++) {
      (function(uri) {
        var module = cachedModules[uri] ||
            (cachedModules[uri] = new Module(uri, STATUS.FETCHING))

        module.status >= STATUS.FETCHED ? onFetched() : fetch(uri, onFetched)

        function onFetched() {
          // cachedModules[uri] is changed in un-correspondence case
          module = cachedModules[uri]

          if (module.status >= STATUS.SAVED) {
            var deps = getPureDependencies(module)

            if (deps.length) {
              Module.prototype._load(deps, function() {
                cb(module)
              })
            }
            else {
              cb(module)
            }
          }
          // Maybe failed to fetch successfully, such as 404 or non-module.
          // In these cases, module.status stay at FETCHING or FETCHED.
          else {
            cb()
          }
        }

      })(unLoadedUris[i])
    }

    function cb(module) {
      module && (module.status = STATUS.READY)
      --remain === 0 && callback()
    }
  }


  Module.prototype._compile = function() {
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


  Module._define = function(id, deps, factory) {
    var argsLength = arguments.length

    // define(factory)
    if (argsLength === 1) {
      factory = id
      id = undefined
    }
    // define(id || deps, factory)
    else if (argsLength === 2) {
      factory = deps
      deps = undefined

      // define(deps, factory)
      if (util.isArray(id)) {
        deps = id
        id = undefined
      }
    }

    // Parses dependencies.
    if (!util.isArray(deps) && util.isFunction(factory)) {
      deps = util.parseDependencies(factory.toString())
    }

    // Gets uri directly for specific modules.
    if (id) {
      var uri = resolve(id)
    }
    // Try to derive uri in IE6-9 for anonymous modules.
    else if (document.attachEvent) {

      // Try to get the current script.
      var script = util.getCurrentScript()
      if (script) {
        uri = util.unParseMap(util.getScriptAbsoluteSrc(script))
      }

      if (!uri) {
        util.log('Failed to derive URI from interactive script for:',
            factory.toString(), 'warn')

        // NOTE: If the id-deriving methods above is failed, then falls back
        // to use onload event to get the uri.
      }
    }

    var meta = { id: id, dependencies: deps, factory: factory }

    if (uri) {
      currentPackageModules.push(save(uri, meta))
    }
    else {
      // Saves information for "memoizing" work in the onload event.
      anonymousModuleMeta = meta
    }

  }


  Module._getCompilingModule = function() {
    return compileStack[compileStack.length - 1]
  }


  Module._find = function(selector) {
    var matches = []

    util.forEach(util.keys(cachedModules), function(uri) {
      if (util.isString(selector) && uri.indexOf(selector) > -1 ||
          util.isRegExp(selector) && selector.test(uri)) {
        var module = cachedModules[uri]
        module.exports && matches.push(module.exports)
      }
    })

    var length = matches.length

    if (length === 1) {
      matches = matches[0]
    }
    else if (length === 0) {
      matches = null
    }

    return matches
  }


  Module._modify = function(id, modifier) {
    var uri = resolve(id)
    var module = cachedModules[uri]

    if (module && module.status === STATUS.COMPILED) {
      runInModuleContext(modifier, module)
    }
    else {
      cachedModifiers[uri] || (cachedModifiers[uri] = [])
      cachedModifiers[uri].push(modifier)
    }

    return seajs
  }


  // For plugin developers
  Module.STATUS = STATUS
  Module._resolve = util.id2Uri
  Module._fetch = util.fetch
  Module.cache = cachedModules


  // Helpers
  // -------

  var fetchingList = {}
  var fetchedList = {}
  var callbackList = {}
  var anonymousModuleMeta = null
  var currentPackageModules = []
  var circularCheckStack = []

  function resolve(ids, refUri) {
    if (util.isString(ids)) {
      return Module._resolve(ids, refUri)
    }

    return util.map(ids, function(id) {
      return resolve(id, refUri)
    })
  }

  function fetch(uri, callback) {
    var requestUri = util.parseMap(uri)

    if (fetchedList[requestUri]) {
      callback()
      return
    }

    if (fetchingList[requestUri]) {
      callbackList[requestUri].push(callback)
      return
    }

    fetchingList[requestUri] = true
    callbackList[requestUri] = [callback]

    // Fetches it
    Module._fetch(
        requestUri,

        function() {
          fetchedList[requestUri] = true

          // Updates module status
          var module = cachedModules[uri]
          if (module.status === STATUS.FETCHING) {
            module.status = STATUS.FETCHED
          }

          // Saves anonymous module meta data
          if (anonymousModuleMeta) {
            save(uri, anonymousModuleMeta)
            anonymousModuleMeta = null
          }

          // Assigns the first module in package to cachedModules[uri]
          // See: test/issues/un-correspondence
          var firstModule = currentPackageModules[0]
          if (firstModule && module.status === STATUS.FETCHED) {
            cachedModules[uri] = firstModule
          }
          currentPackageModules = []

          // Clears
          if (fetchingList[requestUri]) {
            delete fetchingList[requestUri]
          }

          // Calls callbackList
          if (callbackList[requestUri]) {
            util.forEach(callbackList[requestUri], function(fn) {
              fn()
            })
            delete callbackList[requestUri]
          }

        },

        config.charset
    )
  }

  function save(uri, meta) {
    var module = cachedModules[uri] || (cachedModules[uri] = new Module(uri))

    // Don't override already saved module
    if (module.status < STATUS.SAVED) {
      // Lets anonymous module id equal to its uri
      module.id = meta.id || uri

      module.dependencies = resolve(
          util.filter(meta.dependencies || [], function(dep) {
            return !!dep
          }), uri)

      module.factory = meta.factory

      // Updates module status
      module.status = STATUS.SAVED
    }

    return module
  }

  function runInModuleContext(fn, module) {
    var ret = fn(module.require, module.exports, module)
    if (ret !== undefined) {
      module.exports = ret
    }
  }

  function execModifiers(module) {
    var uri = module.uri
    var modifiers = cachedModifiers[uri]

    if (modifiers) {
      util.forEach(modifiers, function(modifier) {
        runInModuleContext(modifier, module)
      })

      delete cachedModifiers[uri]
    }
  }


  function getPureDependencies(module) {
    var uri = module.uri

    return util.filter(module.dependencies, function(dep) {
      circularCheckStack = [uri]

      var isCircular = isCircularWaiting(cachedModules[dep], uri)
      if (isCircular) {
        circularCheckStack.push(uri)
        printCircularLog(circularCheckStack)
      }

      return !isCircular
    })
  }

  function isCircularWaiting(module, uri) {
    if (!module || module.status !== STATUS.SAVED) {
      return false
    }

    circularCheckStack.push(module.uri)
    var deps = module.dependencies

    if (deps.length) {
      if (util.indexOf(deps, uri) > -1) {
        return true
      }

      for (var i = 0; i < deps.length; i++) {
        if (isCircularWaiting(cachedModules[deps[i]], uri)) {
          return true
        }
      }

      return false
    }

    return false
  }

  function isCircular(module) {
    var ret = false
    var stack = [module.uri]
    var parent = module

    while (parent = parent.parent) {
      stack.unshift(parent.uri)

      if (parent === module) {
        ret = true
        break
      }
    }

    ret && printCircularLog(stack, 'warn')
    return ret
  }

  function printCircularLog(stack, type) {
    util.log('Found circular dependencies:', stack.join(' --> '), type)
  }


  // Public API
  // ----------

  var globalModule = new Module(util.pageUri, STATUS.COMPILED)

  seajs.use = function(ids, callback) {
    var preloadMods = config.preload

    if (preloadMods.length) {
      // Loads preload modules before all other modules.
      globalModule._use(preloadMods, function() {
        config.preload = []
        globalModule._use(ids, callback)
      })
    }
    else {
      globalModule._use(ids, callback)
    }

    return seajs
  }


  // For normal users
  seajs.define = Module._define
  seajs.cache = Module.cache
  seajs.find = Module._find
  seajs.modify = Module._modify


  // For plugin developers
  seajs.pluginSDK = {
    Module: Module,
    util: util,
    config: config
  }

}