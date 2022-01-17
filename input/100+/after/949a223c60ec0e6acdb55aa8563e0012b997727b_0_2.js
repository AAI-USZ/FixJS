function() {
  initRedis();
  app.use(express.session({ secret: 'dadaism', store: new RedisStore, cookie: { maxAge: 60000*( (60*24) * 30)} })); // 30 days
  var logFile = fs.createWriteStream(__dirname + '/logs/production.log', {flags: 'a'});
  app.use(express.errorHandler());
  app.use(express.logger({stream: logFile}));
  app.set('port', '/tmp/langy.sock');
}