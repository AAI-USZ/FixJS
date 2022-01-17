function () {
        delete app.resources[file];
        return app.resources[file] = require(
          path.resolve(app._resourceDir, file)
        );
      }