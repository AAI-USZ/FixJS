function () {
  app.use(express.static(__dirname + '/public'));
  logger.handleExceptions();
}