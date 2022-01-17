function (operation) {
    try {
      var api = all[operation];

      // - don't register read apis if we are configured as a writer,
      // with the exception of ping which tests database connection health.
      // - don't register write apis if we are not configured as a writer
      if ((options.only_write_apis && !api.writes_db && operation != 'ping') ||
          (!options.only_write_apis && api.writes_db))
            return;

      wsapis[operation] = api;

      // set up the argument validator
      if (api.args) {
        if (!Array.isArray(api.args)) throw "exports.args must be an array of strings";
        wsapis[operation].validate = validate(api.args);
      } else {
        wsapis[operation].validate = function(req,res,next) { next(); };
      }

    } catch(e) {
      var msg = "error registering " + operation + " api: " + e;
      logger.error(msg);
      throw msg;
    }
  }