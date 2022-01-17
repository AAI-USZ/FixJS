function nextResource() {
    var resource = resources[i++]
      , ctx;

    if (resource) {
      debug('routing %s to %s', req.url, resource.settings.path);
      ctx = new Context(resource, req, res, server);
      ctx.router = router;

      // default root to false
      if(ctx.session) ctx.session.isRoot = req.isRoot || false;
      
      // internal resources must be root
      if(resource.internal || (req.headers && 'dpd-ssh-key' in req.headers)) {
        if(server.options.env === 'development' || req.isRoot) {
          // auto assign root to session
          if(ctx.session) ctx.session.isRoot = true;
        } else {
          debug('401 %s (not root)', req.url);
          res.statusCode = 401;
          res.end("Not Allowed"); 
          return;
        }
      }

      process.nextTick(function () {
        resource.handle(ctx, nextResource);
      });
    } else {
      debug('404 %s', req.url);
      res.statusCode = 404;
      res.end("Not Found");
    }
  }