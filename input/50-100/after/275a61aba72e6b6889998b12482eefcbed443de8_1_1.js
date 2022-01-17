function (logmsg) {
  log("==============================================");
  log("To App: " + logmsg);
  log("==============================================");
  if (!logSubscription || ! logmsg) {
    log("Could not log to app: " + logSubscription + " and " + logmsg);
    return;
  }
  var f = logSubscription.get();
  f.result = { msg: logmsg };
}