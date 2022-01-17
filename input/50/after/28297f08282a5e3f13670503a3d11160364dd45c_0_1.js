function () {
      if (error) return callback(error);

      // execute callback when all files are compiled
      self.compiler.compile(function (error) {
        if (error) return callback(error);

        buildMap();
        callback();
      });
    }