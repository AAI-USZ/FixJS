function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', { layout: false, pretty: true });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use('/public', express.static(__dirname + '/public'));
  app.use(app.router);
  app.use(function(err, req, res, next){
    res.status(500);
    res.render("500", {title : ''});
  });
}