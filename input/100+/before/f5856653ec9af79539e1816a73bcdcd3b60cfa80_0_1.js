function(){
  // the bodyParser middleware parses JSON request bodies
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'watman' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.logger({ format: 'dev' }));
  app.use(flash());
  app.use(express.static(path.join(application_root, "public")));
  app.use(app.router);
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.engine('html', cons.handlebars);
  app.set('views', path.join(application_root, "views"));
  app.set('view engine', 'html');
}