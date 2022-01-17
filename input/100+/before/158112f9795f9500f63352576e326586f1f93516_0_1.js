function replicate_db(source, target, opts, callback) {
    if(typeof opts === "function") {
      callback  = opts;
      opts      = {};
    }
    opts.source = source;
    opts.target = target;
    return relax({db: "_replicate", body: opts, method: "POST"}, callback);
  }