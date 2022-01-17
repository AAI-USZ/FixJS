function(apiKey, options) {
  options = (options === undefined ? {} : options)
  
  Error.stackTraceLimit = Infinity;
  defaultErrorHash.apiKey = apiKey;
  releaseStage = (options.releaseStage === undefined ? (process.env.NODE_ENV === undefined ? "production" : process.env.NODE_ENV) : options.releaseStage);
  appVersion = (options.appVersion === undefined ? undefined : options.appVersion);
  autoNotify = (options.autoNotify === undefined ? true : options.autoNotify);
  notifyReleaseStages = (options.notifyReleaseStages === undefined ? ["production"] : options.notifyReleaseStages);
  useSSL = (options.useSSL === undefined ? false : options.useSSL);
  
  if(options.projectRoot === undefined) {
    projectRoot = path.dirname(require.main.filename);
  } else {
    projectRoot = options.projectRoot.indexOf(path.sep) == 0 ? options.projectRoot : path.join(__dirname, options.projectRoot);
  }
  
  if ( options.packageJSON !== undefined ) {
    appVersion = options.packageJSON.indexOf(path.sep) == 0 ? getPackageVersion(options.packageJSON) : getPackageVersion(path.join(__dirname,options.packageJSON));
  }
  if( appVersion === undefined || appVersion == "unknown" ) {
    appVersion = getPackageVersion(path.join(path.dirname(require.main.filename),'package.json'));
    if(appVersion === undefined || appVersion == "unknown") {
      appVersion = getPackageVersion(path.join(projectRoot,'package.json'));
    }
  }
  
  defaultErrorHash.notifier.version = getPackageVersion(path.join(__dirname,'package.json'));
  
  if(autoNotify) {
    process.on('uncaughtException', function(err) {
      exports.notify(err, {userId: userId, context: context});
      onUncaughtException(err);
    });
  }
  
  return exports.handle
}