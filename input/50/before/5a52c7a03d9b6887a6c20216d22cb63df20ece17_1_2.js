function(result) {
    if (isError(result)) deliver(deferred, onError(result))
    else deliver(deferred, onFulfill(result))
  }