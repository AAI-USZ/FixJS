function() {
      var eventName = this.actual.eventName,
          selector = this.actual.selector;
      this.message = function() {
        return [
          "Expected event " + eventName + " to have been prevented on " + selector,
          "Expected event " + eventName + " not to have been prevented on " + selector
        ]
      }
      return jasmine.JQuery.events.wasPrevented(selector, this.actual)
    }