function(){
  // www redirect
  app.use(function(req, res, next){
    if((/^www\..+/).test(req.headers.host))
      res.redirect('http://novosnumerosonibus.com' + req.originalUrl);
    else
      next();
  });

  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(require('connect-assets')());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(express.static(__dirname + '/mobile/www'));
  app.use(app.router);
}