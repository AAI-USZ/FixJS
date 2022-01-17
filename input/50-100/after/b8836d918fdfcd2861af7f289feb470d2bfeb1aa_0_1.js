function (fulfillmentHandler, errorHandler) {
      if (fulfilled) {
        fulfillmentHandler(responseArgs.resp)
      } else if (erred) {
        errorHandler(responseArgs.resp, responseArgs.msg, responseArgs.t)
      } else {
        fulfillmentHandlers.push(fulfillmentHandler)
        errorHandlers.push(errorHandler)
      }
      return this
    }