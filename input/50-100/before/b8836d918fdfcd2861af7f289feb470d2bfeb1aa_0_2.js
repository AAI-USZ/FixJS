function error(resp, msg, t) {
      var i
      for (i = 0; i < errorHandlers.length; i++) {
        errorHandlers[i](resp, msg, t)
      }
      complete(resp)
    }