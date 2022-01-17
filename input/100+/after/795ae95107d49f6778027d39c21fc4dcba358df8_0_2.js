function(argv) {
  var certificate, privateKey;
  var host = argv.l;
  var port = settings.github_hook_listen_port || 3000;
  var hooks_server;
  var redirect_app;
  var web_app;
  var idjson;
  var startup_actions;

  if(!settings.private_key || !settings.cert){
    utils.die('No key/cert defined in settings; you can mv lib/keys.example to lib/keys.');
    return;
  }

  if (!settings.external_ipv4) {
    utils.die('external_ipv4 is not defined in settings.');
  }

  try{
    privateKey = fs.readFileSync(path.join(settings.private_key)).toString();
    certificate = fs.readFileSync(path.join(settings.cert)).toString();
  }catch(e){
    utils.die('Could not find the private key and/or cert; not starting.');
  }
  if (settings.valid_users.length <= 0){
    utils.die('You must define valid_users in settings; not starting.');
  }

  redirect_app = express.createServer();
  redirect_app.all("*", function (req, res, next) {
    return res.redirect("https://" + req.headers.host + req.url, 301);
  });
  redirect_app.listen(80, host);

  web_app = express.createServer({key: privateKey, cert: certificate});

  web_app.set('views', path.join(__dirname, 'views'));
  web_app.set('view engine', 'jade');
  web_app.set('view options', {layout: false});
  web_app.use(express.logger());
  web_app.use(middleware.vpn_only);
  web_app.use(express.errorHandler({ showStack: true, dumpExceptions: true }));
  web_app.use('/static', express['static'](path.join(__dirname, '..', '..', 'static')));
  web_app.use('/static', express['static'](path.join(__dirname, '..', '..', 'extern')));
  if (settings.testing === true){
    web_app.enable('testing');
  }

  hooks_server = express.createServer();
  hooks_server.use(express.logger());

  projects.install(function (err, installed_projects) {
    if (err) {
      log.error("Init failed:", err);
    }

    routes.web.install(web_app, installed_projects);

    // 404 Page
    web_app.use(function(req, res, next){
      res.render('errors/404.jade', {
        status: 400,
        url: req.url
     });
    });

     // 500 Page
    web_app.use(function(error, req, res, next){
      res.render('errors/500.jade', {
        status: 500,
        error: error
      });
    });

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
  });
}