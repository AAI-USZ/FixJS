function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  
  app.use(connect.compiler({
    src: __dirname + '/public', 
    enable: ['less'] })
  );
  
  app.use(express.static(__dirname + '/public', { maxAge: 1000*60*60 }));
  
  //Custom app settings
  app.set('pageSize', 20);
  
  // what we think of as a large query
  app.set('largeQuery', 300);
  
  if(process.env.GA_ACCOUNT)
    app.set('trackingAccount', process.env.GA_ACCOUNT);
  
}