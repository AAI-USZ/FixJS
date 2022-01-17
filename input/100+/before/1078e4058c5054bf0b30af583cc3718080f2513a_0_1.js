function(err, res) {
      if ((err != null ? err.code : void 0) === 'asset-pipeline/filenotfound') {
        return cb(new Error("css dependency " + filename + " not found"));
      } else if (err) {
        return cb(err);
      } else {
        if (funcs.length > 0) {
          filename = _this.pipeline.path_to_cache(filename);
          return require('./util').write_file(filename, code, function(err) {
            return cb(err, filename);
          });
        } else {
          return cb(null, filename);
        }
      }
    }