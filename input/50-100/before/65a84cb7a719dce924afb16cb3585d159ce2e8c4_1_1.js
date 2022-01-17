f        var ws = new WebSocket('ws://localhost:' + port);
        ws.terminate();
        ws.on('open', function() {
          assert.fail('connect shouldnt be raised here');
        });
        ws.on('close', function() {
          srv.close();
          done();
        });
      });
