function() {
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  // Add common headers
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Mime-Type, X-Requested-With, X-File-Name, Content-Type");
    next();
  });

}