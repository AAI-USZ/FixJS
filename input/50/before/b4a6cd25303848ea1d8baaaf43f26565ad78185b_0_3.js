function() {
          if (!options.inputstream) {
            return callback(code, stderr);
          };
          fs.close(options.inputstream.fd, function() {
            callback(code, stderr);
          });
        }