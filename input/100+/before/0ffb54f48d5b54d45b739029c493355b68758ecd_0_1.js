function (err, stat) {
          var enoent = false
            , done = false;

          if (err) {
            if (err.code !== 'ENOENT') {
              return callback(err);
            } else {
              enoent = true;
            }
          }
          callback.pending -= 1;
          done = callback.pending === 0;
          if (!enoent) {
            if (stat.isSymbolicLink()) return done && callback(null, callback.files);
            if (options.ignoreDotFiles && path.basename(f)[0] === '.') return done && callback(null, callback.files);
            if (options.filter && options.filter(f, stat)) return done && callback(null, callback.files);
            callback.files[f] = stat;
            if (stat.isDirectory()) walk(f, options, callback);
            if (done) callback(null, callback.files);
          }
        }