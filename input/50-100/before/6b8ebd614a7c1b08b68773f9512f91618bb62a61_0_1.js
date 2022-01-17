function bsm_checkPermssion(app) {
    if (!app || !app.manifest.permissions ||
        app.manifest.permissions.indexOf('background') == -1) {
      return false;
    }
    return true;
  }