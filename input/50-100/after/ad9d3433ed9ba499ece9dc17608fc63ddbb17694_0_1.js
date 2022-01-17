function(selector, eventName) {
      var handler = function(e) {
        data.spiedEvents[[selector, eventName]] = e
      }
      jQuery(selector).bind(eventName, handler)
      data.handlers.push(handler)
      return {
        selector: selector,
        eventName: eventName,
        handler: handler,
        reset: function(){
          delete data.spiedEvents[[this.selector, this.eventName]];
        }
      }
    }