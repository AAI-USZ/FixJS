function(selector, eventName) {
  return jasmine.JQuery.events.spyOn($(selector).selector, eventName)
}