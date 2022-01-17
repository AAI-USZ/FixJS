function (err, pkg) {
    if (err) {
      if (err.toString() === "Error: Invalid package.json file") {
        jitsu.log.error(err.toString())
        jitsu.log.error('Please make sure ' + (path.join(dir, '/package.json')).grey + ' is valid JSON');
        return false;
      }
      return package.create(dir, callback);
    }

    package.validate(pkg, dir, options, function (err, updated) {
      return err ? callback(err) : callback(null, updated);
    });
  }