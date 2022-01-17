function (script, options) {
  options         = options || {};
  options.uid     = options.uid || utile.randomString(4).replace(/^\-/, '_');
  options.logFile = forever.logFilePath(options.logFile || options.uid + '.log');
  options.pidFile = forever.pidFilePath(options.pidFile || options.uid + '.pid');

  var monitor, outFD, errFD, workerPath;

/*
 * This log file is forever's log file - the user's outFile and errFile
 * options are not taken into account here.  This will be an aggregate of all
 * the app's output, as well as messages from the monitor process, where
 * applicable.
 *
 */

  outFD = fs.openSync(options.logFile, 'a');
  errFD = fs.openSync(options.logFile, 'a');
  monitorPath = path.resolve(__dirname, '..', 'bin', 'monitor');

  monitor = spawn(monitorPath, [ script ], {
    stdio: [ 'ipc', outFD, errFD ],
    detached: true
  });
  monitor.on('exit', function (code) {
    console.error('Monitor died unexpectedly with exit code %d', code);
  });
  monitor.send(JSON.stringify(options));
  monitor.unref();
}