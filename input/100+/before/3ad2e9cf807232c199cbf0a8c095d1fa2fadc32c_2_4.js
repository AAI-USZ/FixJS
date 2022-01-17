function() {
          fetchedList[requestUri] = true

          // Saves anonymous module meta data
          if (anonymousModuleMeta) {
            save(uri, anonymousModuleMeta)
            anonymousModuleMeta = null
          }

          // Assigns the first module in package to cachedModules[uri]
          // See: test/issues/un-correspondence
          var firstModule = currentPackageModules[0]
          if (firstModule && cachedModules[uri].status === STATUS.FETCHING) {
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

        }