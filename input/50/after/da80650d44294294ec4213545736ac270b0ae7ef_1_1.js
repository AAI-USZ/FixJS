function () {
  logger.setLevels(winston.config.syslog.levels);
  app.use(express.static(__dirname + '/public'));
  logger.handleExceptions();
}