function () {
  if (!databaseJsonLoaded) {
    tryLoadDatabaseJson(path.join(process.cwd(), "database.json"));
  }

  var callback = arguments[arguments.length - 1];
  var opts;
  if (arguments.length === 1) {
    opts = getDefaultConnectOptions();
  } else {
    opts = arguments[0];
  }

  if (!opts || !opts.driver) {
    throw new Error("Invalid options. Have you configured your database.json file?");
  }
  var driverName = opts.driver;
  var Driver = require('./drivers/' + driverName + '.js');
  var driver = new Driver();
  driver.connect(opts, callback);
}