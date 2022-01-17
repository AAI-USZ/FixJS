function() {
  var logFile = fs.createWriteStream(__dirname + '/logs/production.log', {flags: 'a'});
  app.use(express.errorHandler());
  app.use(express.logger({stream: logFile}));
  app.set('port', '/tmp/langy.sock');
}