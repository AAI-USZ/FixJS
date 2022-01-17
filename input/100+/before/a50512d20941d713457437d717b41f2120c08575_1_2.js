function onMessage(e) {
            try {
              var d = JSON.parse(e.data);
              if (d.a === 'ready') messageTarget.postMessage(req, origin);
              else if (d.a === 'error') {
                if (cb) { cb(d.d); cb = null; }
              } else if (d.a === 'response') {
                removeListener(window, 'message', onMessage);
                removeListener(window, 'unload', cleanup);
                cleanup();
                if (cb) { cb(null, d.d); cb = null; }
              }
            } catch(e) { }
          }