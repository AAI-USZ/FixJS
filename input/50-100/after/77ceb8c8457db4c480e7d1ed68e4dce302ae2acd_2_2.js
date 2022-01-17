function(err, result) {
    if (err && err.type && err.type === 'connectionerror') {
      retries--;

      if (retries === 0 || request.aborted) {
        // We give up, notify the callback
        return callback(err, result);
      }

      // Retry in 500ms
      setTimeout(function () {
        request.currentRequest = self._call(requestId, name, args, retry_callback);
      }, sleepTime);
      sleepTime *= self.retryTimeFactor;
      return true; // We handled the error.
    }
    if (callback) {
      return callback(err, result);
    }
  }