function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.methodOverride());
  app.use(facebookSession.parseCookie({
      app_id: process.env.FACEBOOK_APP_ID || '397068970352801',
      secret: process.env.FACEBOOK_SECRET || '6971160015d5c88ecc9d64cbbc4f8844'
    })
  );
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
}