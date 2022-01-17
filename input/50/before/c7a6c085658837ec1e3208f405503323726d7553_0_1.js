function(moduleKey) {
      return {
        loaded: false, key: moduleKey, dependencies: [], fails: 0, namespace: undefined, exports: undefined, fetched: false
      }
    }