function bootApplication(next) {

  // Create our express instance, export for later reference
  var app = express.createServer ? express.createServer() : express();
  app.path = function() { return path };
  app.isCluster = false;

  // Load configuration
  var Config = calipso.configuration; //require(path + "/lib/core/Config").Config;
  app.config = new Config();
  app.config.init(function(err) {

    if(err) return console.error(err.message);

    // Default Theme
    calipso.defaultTheme = app.config.get('themes:default');

    app.use(express.bodyParser());
    // Pause requests if they were not parsed to allow PUT and POST with custom mime types
    app.use(function (req, res, next) { if (!req._body) { req.pause(); } next(); });
    app.use(express.methodOverride());
    app.use(express.cookieParser(app.config.get('session:secret')));
    app.use(express.responseTime());

    // Create dummy session middleware - tag it so we can later replace
    var temporarySession = app.config.get('installed') ? {} : express.session({ secret: "installing calipso is great fun" });
    temporarySession.tag = "session";
    app.use(temporarySession);

    // Create holders for theme dependent middleware
    // These are here because they need to be in the connect stack before the calipso router
    // THese helpers are re-used when theme switching.
    app.mwHelpers = {};

    // Load placeholder, replaced later
    if(app.config.get('libraries:stylus:enabled')) {
      app.mwHelpers.stylusMiddleware = function (themePath) {
        var mw = stylus.middleware({
          src: themePath + '/stylus',
          dest: themePath + '/public',
          debug: false,
          compile: function (str, path) { // optional, but recommended
            return stylus(str)
              .set('filename', path)
              .set('warn', app.config.get('libraries:stylus:warn'))
              .set('compress', app.config.get('libraries:stylus:compress'));
          }
        });
        mw.tag = 'theme.stylus';
        return mw;
      };
      app.use(app.mwHelpers.stylusMiddleware(''));
    }
    // Static
    app.mwHelpers.staticMiddleware = function (themePath) {
      var mw = express["static"](themePath + '/public', {maxAge: 86400000});
      mw.tag = 'theme.static';
      return mw;
    };
    // Load placeholder, replaced later
    app.use(app.mwHelpers.staticMiddleware(''));

    // Core static paths
    app.use(express["static"](path + '/media', {maxAge: 86400000}));
    app.use(express["static"](path + '/lib/client/js', {maxAge: 86400000}));

    // Translation - after static, set to add mode if appropriate
    app.use(translate.translate(app.config.get('i18n:language'), app.config.get('i18n:languages'), app.config.get('i18n:additive')));

    // Core calipso router
    calipso.init(app, function() {

      // Add the calipso mw
      app.use(calipso.routingFn());

      // return our app refrerence
      next(app);

    })

  });

}