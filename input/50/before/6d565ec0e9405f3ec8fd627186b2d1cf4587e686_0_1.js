function(done) {
      var client = x11.createClient(function(dpy) {
          display=dpy;
          X = display.client;
          done();
      });
      client.on('error', done);
  }