function(selector, eventName) {
      var handler = function(e) {
        data.spiedEvents[[selector, eventName]] = e
      }
      jQuery(selector).bind(eventName, handler)
      data.handlers.push(handler)
    }