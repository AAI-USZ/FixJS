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
        }