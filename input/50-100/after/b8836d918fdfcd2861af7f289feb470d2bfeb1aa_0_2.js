function error(resp, msg, t) {
      responseArgs.resp = resp
      responseArgs.msg = msg
      responseArgs.t = t
      while (errorHandlers.length > 0) {
        errorHandlers.shift()(resp, msg, t)
      }
      complete(resp)
    }