function onMessage(e) {
          // only one message gets through
          removeListener(window, 'message', onMessage);
          var d;
          o = e.origin;
          try {
            d = JSON.parse(e.data);
          } catch(err) { }
          if (cb) {
            // this setTimeout is critically important for IE8 -
            // in ie8 sometimes addListener for 'message' can synchronously
            // cause your callback to be invoked.  awesome.
            setTimeout(function() {
              cb(o, d.d, function(r) {
                cb = undefined;
                doPost({a: 'response', d: r});
              });
            }, 0);
          }
        }