function(name, params, callback) {
  if (typeof(params) == "function") {
      callback = params;
      params = undefined;
  }

  if (this.apikey.get()) {
    if (params === undefined) {
      params = {
        'apikey': this.apikey.get()
      };
    } else {
      params.apikey = this.apikey.get();
    }
  }
  return this.rpc.doRPC(name, params, callback);
}