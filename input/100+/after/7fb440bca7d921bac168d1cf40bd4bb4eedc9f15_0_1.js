function (appName, key, value, callback) {

  if (value === null) {
		if (key === null) {
		  jitsu.log.error(
        'You must specify both an environment variable name and value.'
      );
      return callback({});
		}

    value = key;
    key = appName;
    return viewApp(callback, update);
  }

  viewAppByName(appName, callback, update);
  
  function update(err, app) {

    app.env = app.env || {};
    app.env[key] = value;
    jitsu.apps.update(app.name, { env: app.env }, callback);
  }
}