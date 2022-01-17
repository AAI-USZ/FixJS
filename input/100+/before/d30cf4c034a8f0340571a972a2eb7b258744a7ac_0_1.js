function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.methodOverride());
  app.use(facebookSession.parseCookie({
      app_id: process.env.FACEBOOK_APP_ID,
      secret: process.env.FACEBOOK_SECRET
    })
  );
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
}