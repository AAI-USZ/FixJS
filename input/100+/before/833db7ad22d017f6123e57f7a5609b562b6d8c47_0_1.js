function(){
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({
    store: sessionStore,
    key: 'cgipsid',
    secret: 'aabdonie98gsdv79sdjsbv2624zihef',
    cookie: {
      maxAge: 604800000
    }
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.staticCache());
  app.use(gzippo.staticGzip(__dirname + '/public'));
  app.set('view engine', 'jade');
  app.set('views', __dirname + '/server/views');
  app.set('view options', {
    layout: false
  });
}