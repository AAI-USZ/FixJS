function(appName) {
    if (this._realPath) {
      return this._realPath[appName];
    }

    this._realPath = {};

    var appPathList = "@GAIA_APP_RELATIVEPATH@".trim().split(" ");
    for (var i = 0; i < appPathList.length; i++) {
      var currentAppName = appPathList[i].split('/')[1];

      if (!currentAppName) {
        continue;
      }

      this._realPath[currentAppName] = appPathList[i];
    }
    return '/' + this._realPath[appName];
  }