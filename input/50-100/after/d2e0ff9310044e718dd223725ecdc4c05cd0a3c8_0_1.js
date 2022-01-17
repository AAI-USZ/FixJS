function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname+'/../../client/cofetch'));
  app.use(express.logger({ format: ':method :url' }));
}