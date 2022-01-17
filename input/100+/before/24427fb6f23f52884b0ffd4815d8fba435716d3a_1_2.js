function(app, configurations, express) {
  var clientSessions = require('client-sessions');
  var nconf = require('nconf');

  nconf.argv().env().file({ file: 'local.json' });

  // Configuration

  app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.set('view options', { layout: false });
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(__dirname + '/public'));
    app.use(clientSessions({
      cookieName: nconf.get('session_cookie'),
      secret: nconf.get('session_secret'), // MUST be set
      // true session duration:
      // will expire after duration (ms)
      // from last session.reset() or
      // initial cookieing.
      duration: 24 * 60 * 60 * 1000 * 28 // 4 weeks
    }));
    app.use(app.router);
  });

  app.configure('development, test', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  });

  app.configure('development', function() {
    app.set('napkin', 1);
  });

  app.configure('test', function() {
    app.set('napkin', 2);
  });

  app.configure('production', function(){
    app.use(express.errorHandler());
    app.set('napkin', 0);
  });

  app.dynamicHelpers({
    session: function (req, res) {
      return req.session;
    }
  });

  return app;
}