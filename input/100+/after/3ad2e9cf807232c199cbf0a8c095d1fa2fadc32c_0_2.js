function(uris, callback) {
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