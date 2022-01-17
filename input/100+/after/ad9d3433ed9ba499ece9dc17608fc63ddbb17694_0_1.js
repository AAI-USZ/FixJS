function() {
  this.addMatchers(jasmine.JQuery.matchersClass)
  this.addMatchers({
    toHaveBeenTriggeredOn: function(selector) {
      this.message = function() {
        return [
          "Expected event " + this.actual + " to have been triggered on " + selector,
          "Expected event " + this.actual + " not to have been triggered on " + selector
        ]
      }
      return jasmine.JQuery.events.wasTriggered($(selector).selector, this.actual)
    }
  })
  this.addMatchers({
    toHaveBeenTriggered: function(){
      var eventName = this.actual.eventName,
          selector = this.actual.selector;
      this.message = function() {
        return [
          "Expected event " + eventName + " to have been triggered on " + selector,
          "Expected event " + eventName + " not to have been triggered on " + selector
        ]
      }
      return jasmine.JQuery.events.wasTriggered(selector, eventName)
     }
  })
  this.addMatchers({
    toHaveBeenPreventedOn: function(selector) {
      this.message = function() {
        return [
          "Expected event " + this.actual + " to have been prevented on " + selector,
          "Expected event " + this.actual + " not to have been prevented on " + selector
        ]
      }
      return jasmine.JQuery.events.wasPrevented($(selector).selector, this.actual)
    }
  })
  this.addMatchers({
    toHaveBeenPrevented: function() {
      var eventName = this.actual.eventName,
          selector = this.actual.selector;
      this.message = function() {
        return [
          "Expected event " + eventName + " to have been prevented on " + selector,
          "Expected event " + eventName + " not to have been prevented on " + selector
        ]
      }
      return jasmine.JQuery.events.wasPrevented(selector, eventName)
    }
  })
}