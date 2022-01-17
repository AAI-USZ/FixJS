function ensureHttpsMiddleware(req, res, next){
    // Skip if it's not in the proper environment
    if (options.envs.length && ~options.envs.indexOf(req.app.settings.env) === 0){
      return next();
    }

    if (req.secure === false && !!req.connection.encrypted === false){
      return res.redirect(replaceProtocol(req));
    }

    next();
  }