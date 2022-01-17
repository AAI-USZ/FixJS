function(opts, cb) {
        if (!cb) throw "missing required callback argument";

        // test required options
        var err;
        if (!opts.url) err = "missing required 'url' parameter";
        if (!opts.relay_url) err = "missing required 'relay_url' parameter";
        if (err) setTimeout(function() { cb(err); }, 0);

        // supply default options
        if (!opts.window_features || isFennec()) opts.window_features = undefined;

        // opts.params may be undefined

        var iframe;

        // sanity check, are url and relay_url the same origin?
        var origin = extractOrigin(opts.url);
        if (origin !== extractOrigin(opts.relay_url)) {
          return setTimeout(function() {
            cb('invalid arguments: origin of url and relay_url must match');
          }, 0);
        }

        var messageTarget;

        if (isIE) {
          // first we need to add a "relay" iframe to the document that's served
          // from the target domain.  We can postmessage into a iframe, but not a
          // window
          iframe = document.createElement("iframe");
          // iframe.setAttribute('name', framename);
          iframe.setAttribute('src', opts.relay_url);
          iframe.style.display = "none";
          iframe.setAttribute('name', RELAY_FRAME_NAME);
          document.body.appendChild(iframe);
          messageTarget = iframe.contentWindow;
        }

        var w = window.open(opts.url, null, opts.window_features);

        if (!messageTarget) messageTarget = w;

        var req = JSON.stringify({a: 'request', d: opts.params});

        // cleanup on unload
        function cleanup() {
          if (iframe) document.body.removeChild(iframe);
          iframe = undefined;
          if (w) w.close();
          w = undefined;
        }

        addListener(window, 'unload', cleanup);

        function onMessage(e) {
          try {
            var d = JSON.parse(e.data);
            if (d.a === 'ready') messageTarget.postMessage(req, origin);
            else if (d.a === 'error') cb(d.d);
            else if (d.a === 'response') {
              removeListener(window, 'message', onMessage);
              removeListener(window, 'unload', cleanup);
              cleanup();
              cb(null, d.d);
            }
          } catch(e) { }
        };

        addListener(window, 'message', onMessage);

        return {
          close: cleanup,
          focus: function() {
            if (w) w.focus();
          }
        };
      }