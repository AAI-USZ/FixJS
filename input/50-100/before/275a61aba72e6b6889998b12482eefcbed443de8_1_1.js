function (logmsg) {
  log("==============================================");
  log("To App: " + logmsg);
  log("==============================================");
  if (!logSubscription || ! logmsg) {
    return;
  }
  var f = logSubscription.get();
  f.result = { msg: logmsg };
}