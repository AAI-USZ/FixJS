function (err, pkg) {
    if (err) {
      if (err.toString() === "Error: Invalid package.json file") {
        jitsu.log.error(err.toString())
        return callback(
          'Please make sure ' + (path.join(dir, '/package.json')).grey + ' is valid JSON',
          false,
          false
        );
      }
      return package.create(dir, callback);
    }

    package.validate(pkg, dir, options, function (err, updated) {
      return err ? callback(err) : callback(null, updated);
    });
  }