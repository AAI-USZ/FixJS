function(appName) {
    if (this._realPath) {
      return this._realPath[appName];
    }

    this._realPath = {};

    var appPathList = "@GAIA_APP_RELATIVEPATH@".split(" ");
    for (var i; i < appPathList.length; i++) {
      this._realPath[appPathList[i].split("/")[1]] = appPathList[i];
    }
    return this._realPath[appName];
  }