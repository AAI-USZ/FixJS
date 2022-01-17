function(uri) {
        var module = cachedModules[uri] ||
            (cachedModules[uri] = new Module(uri, STATUS.FETCHING))

        module.status === STATUS.SAVED ? onSaved() : fetch(uri, onSaved)

        function onSaved() {
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
          // Maybe failed to fetch successfully, such as 404 error.
          else {
            cb()
          }
        }

      }