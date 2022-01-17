function replicate_db(source, target, opts, callback) {
    if(typeof opts === "function") {
      callback  = opts;
      opts      = {};
    }
    if(typeof target === "object") {
      var target_cfg = target.config || {};
      if(target_cfg.url && target_cfg.db) {
        target = u.resolve(target_cfg.url, target_cfg.db);
      }
      else {
        return errs.handle(errs.create(
          { "note"  : "replication target is invalid"
          , "scope" : "nano"
          , "errid" : "replication_target"
          }), callback);
      }
    }
    if(typeof source === "object") {
      var source_cfg = source.config || {};
      if(source_cfg.url && source_cfg.db) {
        source = u.resolve(source_cfg.url, source_cfg.db);
      }
      else {
        return errs.handle(errs.create(
          { "note"  : "replication source is invalid"
          , "scope" : "nano"
          , "errid" : "replication_source"
          }), callback);
      }
    }
    opts.source = source;
    opts.target = target;
    return relax({db: "_replicate", body: opts, method: "POST"}, callback);
  }