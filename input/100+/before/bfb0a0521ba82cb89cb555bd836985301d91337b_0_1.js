function (err, pkg) {
    if (err) {
      return package.create(dir, callback);
    }

    package.validate(pkg, dir, options, function (err, updated) {
      return err ? callback(err) : callback(null, updated);
    });
  }