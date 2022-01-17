function(exists) {

        // server error if `main` does not exist
        if (!exists) {
          var msg = main + ' not found in ' + url;
          log('error', msg);
          in_progress = false;
          return set_handler(mk_error_handler(500, main + ' not found'));
        }

        log('log', 'Building', workdir);
        return build(workdir, function(err) {

          if (err) {
            log('error', err);
            in_progress = false;
            return set_handler(mk_error_handler(500, 'Build failed'));
          }
          
          // restart child after it was updated
          log('log', 'Restarting', main_module);
          return spinner.stop(main_module, function() {
            return spinner.start(main_module, function(err) {
              in_progress = false;

              if (err) {
                log('error', err);
                return set_handler(mk_error_handler(500, 'Unable to spawn app'));
              }

              return set_handler(function(req, res, next) {
                var buffer = http_proxy.buffer(req); // cache incoming data before of async call

                // call start on every request for idle timeout
                return spinner.start(main_module, function(err, socket) {
                  if (err || !socket) {
                    if (!err) err = new Error('No port to app');
                    log('error', err);
                    return res.end(err.toString());
                  }

                  return proxy.proxyRequest(req, res, {
                    host: 'localhost',
                    port: socket,
                    buffer: buffer,
                  });
                });
              });
            });
          });
        });
      }