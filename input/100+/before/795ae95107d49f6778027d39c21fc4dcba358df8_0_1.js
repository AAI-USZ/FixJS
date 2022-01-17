function (err, installed_projects) {
    if (err) {
      log.error("Init failed:", err);
    }

    routes.web.install(web_app, installed_projects);
    web_app.listen(443, host);

    routes.hooks.install(hooks_server, installed_projects);
    hooks_server.listen(port, host);

    if (settings.pokemon === true) {
      // GOTTA CATCH 'EM ALL!
      process.on('uncaughtException', function(err) {
        log.error(err);
      });
    }

    process.on('SIGHUP', function() {
      log.log('Got SIGHUP');
      // Node.js's require isn't actually a global but rather local to each module.
      var new_settings;
      var old_settings = settings;
      // We want to read the new settings, so delete settings from the require cache
      delete require.cache[path.join(__dirname, "../", "settings.js")];
      new_settings = require('../settings');
      // now modify the settings object so that all other modules see the new settings
      _.each(old_settings, function (value, key) {
        delete old_settings[key];
      });
      _.each(new_settings, function (value, key) {
        old_settings[key] = value;
      });
      settings = old_settings;
      projects.install();
    });
  }