function () {
        delete app.resources[common.capitalize(file)];
        return app.resources[common.capitalize(file)] = require(
          path.resolve(app._resourceDir, file)
        );
      }