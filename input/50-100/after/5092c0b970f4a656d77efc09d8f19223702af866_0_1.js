function(err, paths) {
      if (err) cb(err);
      var newPaths = [];
      paths.forEach(function(filepath) {
        var opts = _.clone(options);
        opts.path = filepath;
        newPaths.push(new Path(opts));
      });
      expandPaths(newPaths, cb);
    }