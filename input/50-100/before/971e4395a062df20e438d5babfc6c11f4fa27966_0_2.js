function(exists) {
    if(!exists) {
      return callback(new Error("Error: Theme does not exist"));
    }

    path.exists(themeAssets, function(exists) {
      if(!exists) {
        util.log("No assets directory found in " + themeDirectory);
        fs.mkdir(siteAssets, function() {
          return moveQuillAssets();
        });
      }

      wrench.copyDirRecursive(themeAssets, siteAssets, function() {
        util.log("Successfully copied assets");
        moveQuillAssets();
      });
    });
  }