function() {
      var authorized = client.authorized ||
                       client.authorizationError === hosterr;

      console.error('expected: ' + ok + ' authed: ' + authorized);

      assert.equal(ok, authorized);
      server.close();
    }