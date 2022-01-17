function(act, params, cb) {
  try {
    this.env[act](params, cb);
  }
  catch(e) {
    cb(e);
  }
}