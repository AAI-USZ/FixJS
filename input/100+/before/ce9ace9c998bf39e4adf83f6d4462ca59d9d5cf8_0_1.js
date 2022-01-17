function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', { layout: false, pretty: true });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use('/Styles', express.static(__dirname + '/Styles'));
  app.use('/Images', express.static(__dirname + '/Images'));
  app.use(app.router);
  app.use(function(err, req, res, next){
    res.status(500);
    res.render("500", {title : ''});
  });
}