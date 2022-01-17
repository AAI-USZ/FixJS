function (fulfillmentHandler, errorHandler) {
      fulfillmentHandlers.push(fulfillmentHandler)
      errorHandlers.push(errorHandler)
      return this
    }