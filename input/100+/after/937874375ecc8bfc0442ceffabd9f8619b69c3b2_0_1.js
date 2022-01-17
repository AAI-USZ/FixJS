function(){
    
  app.set('view engine', 'jade');
  app.set('views', __dirname + '/views');
  app.set('view options', {
      layout: false,
      pretty: true,
      // debug: true,
  });
  
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/../' + config.public_dir));
  
  // sessions and auth
  app.use( express.cookieParser( config.instance_server.cookie_secret ) );
  var session_db_name = config.MongoDB.popit_prefix + config.MongoDB.session_name;
  var session_server  = new Server(
      config.MongoDB.host,
      config.MongoDB.port,
      {auto_reconnect: true, native_parser: true}
  );
  var session_db = new Db( session_db_name, session_server, {} );
  var session_store = new mongoStore({ db: session_db });
  
  app.use( express.session({
      secret: config.instance_server.cookie_secret,
      store: session_store,
  }) );
  
  // Select the instance now so that it is available to everyauth to refer to
  // the correct db with.
  app.use( require('../lib/middleware/config')() );
  app.use(instanceSelector());
  
  app.use( everyauth.middleware() );
  
  // This is a bodge to deal with everyauth not seeming to attach info to the
  // responses in apps that have been mounted on the parent app. By putting
  // the user (or null) onto locals we can sidestep this issue. Perhaps we
  // should look at different auth approaches.
  app.use(function (req,res,next) {
    res.local('user', req.user );
    next();
  });

  app.use('/api',   require('../lib/apps/api') );

  app.use('/info',   require('../lib/apps/info')() );
  app.use('/token',  require('../lib/apps/token') );

  app.use('/autocomplete',  require('../lib/apps/autocomplete') );

  var person_app_factory = require('../lib/apps/migration');
  app.use('/migration', person_app_factory() );

  var person_app_factory = require('../lib/apps/person');
  app.use('/person', person_app_factory() );

  var organisation_app_factory = require('../lib/apps/organisation');
  app.use('/organisation', organisation_app_factory() );

  app.use(app.router);
  
  app.use( require('../lib/errors').errorHandler );
    
}