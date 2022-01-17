function(err, req, res, next){
      winston.error(err);
      if(req.accepts('html') || req.is('html')) {
        res.status(err.status || 500);
        res.render('500', { error: err });
        return;
      }
      res.send(err.status || 500, { error: err.message });
    }