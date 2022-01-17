function(selector) {
      this.message = function() {
        return [
          "Expected event " + this.actual + " to have been prevented on " + selector,
          "Expected event " + this.actual + " not to have been prevented on " + selector
        ]
      }
      return jasmine.JQuery.events.wasPrevented(selector, this.actual)
    }