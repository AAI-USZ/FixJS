function (absReq, name) {
    var folderPath = join(root, absReq)
      , jsonPath = join(folderPath, 'package.json')
      , json = {};

    // folder must exists if we commit to it
    if (!fs.existsSync(folderPath)) {
      return false;
    }

    // package.json must exist
    if (!exists(jsonPath)) {
      error("resolver could not load npm module " + name + " - package.json not found");
      return false;
    }

    // package.json must be valid json
    try {
      json = JSON.parse(read(jsonPath));
    } catch (e) {
      error("could not load npm module " + name + " - package.json invalid");
    }

    // prefer browserMain entry point if specified, then main, then index
    var mainFile = json.browserMain || json.main || 'index';
    if (!exists(join(folderPath, mainFile))) {
      if (!exists(join(folderPath, mainFile + '.js'))) {
        error("resolver could not load npm module " + name + "'s package.json lies about main: " + mainFile + " does not exist");
      }
      mainFile += '.js';
    }
    return join(absReq, mainFile);
  }