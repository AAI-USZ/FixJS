function() {

      console.error('expected: ' + ok + ' authed: ' + client.authorized);

      assert.equal(ok, client.authorized);
      server.close();
    }