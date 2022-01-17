function(act, params, cb) {
  log.silly("Handling act request locally");
  log.silly(uri, "url");
  log.silly(act, "act");

  log.silly(params, "params");
  try {
    this.env[act](params, cb);
  }
  catch(e) {
    cb(e);
  }
}