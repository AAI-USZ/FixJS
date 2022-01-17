function appendModule(self, output, filepath, appended, seperator, callback) {
  var stream;

  // ignore this module if it has already been appended
  if (appended.indexOf(filepath) !== -1) {
    return callback(null);
  }

  // ignore this module in the future
  appended.push(filepath);

  // append JSON seperator
  if (seperator) {
    output.write(',');
  }

  // append JSON property name
  output.write('"' + filepath + '":');

  // append source code content to output
  stream = self.compiler.read(filepath);
  stream.on('data', output.write.bind(output));
  stream.resume();

  stream.on('error', function (error) {
    callback(error);
  });
  stream.once('end', function () {
    var dependencies = self.cache.dependencies[filepath];

    // resolve relative dependencies
    async.map(dependencies, self.resolveModule.bind(self, filepath), function (error, dependencies) {
      if (error) return callback(error);

      // check that all dependencies was resolved
      var i = dependencies.length;
      while (i--) {
        if (dependencies[i] === false) {
          return output.emit('error', new Error('could not resolve dependencies in ' + filepath));
        }
      }

      // remove allready included modules
      dependencies = dependencies.filter(function (filename) {
        return (appended.indexOf(filename) === -1);
      });

      // This will execute appendModule on all dependencies
      function append(filepath) {
        return function (callback) {
          appendModule(self, output, filepath, appended, true, callback);
        };
      }
      async.series(dependencies.map(append), callback);
    });
  });
}