function(selector, eventName) {
  jasmine.JQuery.events.spyOn($(selector).selector, eventName)
}