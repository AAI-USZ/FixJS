function () {
        if (error) return callback(error);

        // execute callback when all files are compiled
        self.compiler.modules.compile(function (error) {
          if (error) return callback(error);

          self.compiler.presenter.compile(function (error) {
            if (error) return callback(error);

            buildMap('modules');
            buildMap('presenter');

            callback();
          });
        });
      }