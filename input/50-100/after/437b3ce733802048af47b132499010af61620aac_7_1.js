function onUniverse() {
  localMailAPI = createBridgePair(universe).api;
  // This obviously needs to be sent over the wire in a worker/multi-page setup.
  localMailAPI.config = universe.exposeConfigForClient();
  console.log("Mail universe/bridge created, notifying.");
  for (var i = 0; i < _universeCallbacks.length; i++) {
    _universeCallbacks[i](universe);
  }
  _universeCallbacks = null;
  var evtObject = document.createEvent('Event');
  evtObject.initEvent('mailapi', false, false);
  evtObject.mailAPI = localMailAPI;
  window.dispatchEvent(evtObject);
}