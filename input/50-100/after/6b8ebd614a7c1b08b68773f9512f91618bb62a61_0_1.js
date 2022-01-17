function bsm_checkPermssion(app) {
    if (!app || !app.manifest.permissions)
      return false;

    var permissions = Object.keys(app.manifest.permissions).map(function map_perm(key) {
      return app.manifest.permissions[key];
    });

    return (permissions.indexOf('background') != -1)
  }