function (code) {
      if (code) {
        var err = new Error('NPM Install failed');
        err.code = code;
        err.result = stderr;
        err.blame = {
          type: 'user',
          message: 'NPM failed to install dependencies'
        };

        haibu.emit('npm:install:failure', 'info', {
          code: code,
          meta: meta
        });

        callback(err);
        return;
      }

      haibu.emit('npm:install:success', 'info', meta);
      callback();
    }