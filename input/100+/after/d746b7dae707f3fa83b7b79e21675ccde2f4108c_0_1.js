function test_401_responses() {
  PREFS.set("client.backoff", "50");
  PREFS.set("manager.putFreq", 50);
  const app = get_mock_app();
  const username = "123";
  const premadeToken = {
    id: "testtest",
    key: "testtest",
    endpoint: "http://localhost:8080/1.0/123",
    uid: "uid",
    duration: "5000"
  };

  let server = get_server_with_user(username);
  let client = get_client_for_server(username, server);

  server.mockStatus = {
    code: 401,
    method: "Unauthorized"
  };

  let mockRequestCount = 0;
  let clientFirstToken = null;
  server.onRequest = function mockstatus() {
    mockRequestCount++;
    switch (mockRequestCount) {
      case 1:
        clientFirstToken = client.token;
        // Switch to using mock 201s.
        this.mockStatus = {
          code: 201,
          method: "Created"
        };
        break;
      case 2:
        // Check that the client obtained a different token.
        do_check_neq(client.token.id, clientFirstToken.id);
        do_check_neq(client.token.key, clientFirstToken.key);
        server.stop(run_next_test);
        break;
    }
  }

  let manager = new AitcManager(function() {
    CommonUtils.nextTick(gotManager);
  }, client, premadeToken);

  function gotManager() {
    // Assume first token is not outdated.
    manager._lastTokenTime = Date.now();
    manager.appEvent("install", get_mock_app());
  }
}