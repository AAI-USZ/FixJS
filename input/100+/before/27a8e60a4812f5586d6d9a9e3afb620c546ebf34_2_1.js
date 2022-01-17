function setupLogger() {
  // don't create the logger if it already exists
  if (LOGGER) return;

  if (!log_path)
    return console.log("no log path! Not logging!");
  else
    mkdir_p(log_path);

  var filename = path.join(log_path, configuration.get('process_type') + "-metrics.json");

  LOGGER = new (winston.Logger)({
      transports: [new (winston.transports.File)({filename: filename})],
      timestamp: function () { return new Date().toISOString() },
    });
}