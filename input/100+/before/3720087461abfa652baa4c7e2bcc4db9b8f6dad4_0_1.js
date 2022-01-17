function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');

  app.use(express.bodyParser(
      {
        uploadDir: ((options.upload.method == "direct") ? options.upload.paths.temp : null)
      }
  ));

  app.use(express.methodOverride());
  app.use(express.cookieParser("twibooru wut"));
  app.use(express.session());
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
}