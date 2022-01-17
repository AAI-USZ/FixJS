function(req, res) {
      winston.error('Failed to locate:'+req.url);
      if(req.accepts('html') || req.is('html')) {
        res.status(404);
        res.render('404', { url: req.url });
        return;
      }
      res.send(404, { error: "can't find the resource" });
    }