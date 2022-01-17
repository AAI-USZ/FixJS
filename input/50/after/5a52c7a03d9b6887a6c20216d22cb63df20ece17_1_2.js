function(result) {
    // Override `deferred` so that outer `when` will return present
    // result instead of deferred one if `value` is already present.
    deferred = isError(result) ? deliver(deferred, onError(result))
                               : deliver(deferred, onFulfill(result))
  }