function test_manager_getfrequency() {
  const activeFreq = 500;
  const username = "resu";
  PREFS.set("manager.getActiveFreq", activeFreq);

  let lastRequestTime = 0;
  let mockRequestCount = 0;

  let server = get_server_with_user(username);
  server.onRequest = function onRequest() {
    mockRequestCount++;

    let timeDiff = Date.now() - lastRequestTime;
    // We assume nsITimer has +/- 100ms variance.
    do_check_true(activeFreq <= timeDiff + 100);
    lastRequestTime = Date.now();

    // Run for 4 GETs, then stop.
    if (mockRequestCount == 4) {
      manager._state = manager._PASSIVE;
      manager._client = null;
      manager._lastToken = null;
      server.stop(run_next_test);
    }
  };
  server.mockStatus = {code: 304};

  let client = get_client_for_server(username, server);
  let manager = new AitcManager(function() {
    CommonUtils.nextTick(gotManager);
  }, client);

  function gotManager() {
    // Token is all good.
    manager._lastTokenTime = new Date();
    // Initiate GETs at active frequency.
    manager._state = manager._ACTIVE;
  }
}