function(err, data) {
      var line, m, procfile, _i, _len, _ref;
      if (err) return callback(err);
      procfile = new Procfile;
      _ref = data.split("\n");
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        line = _ref[_i];
        if (m = line.match(/^([A-Za-z0-9_]+):\s*(.+)$/)) procfile[m[1]] = m[2];
      }
      return callback(err, procfile);
    }