function(){

  function ensureHttpsMiddleware(req, res, next){
    next();

    if (req.protocol === 'http' && req.connection.encrypted === false){
      res.redirect(replaceProtocol(req));
    }
  }

  return ensureHttpsMiddleware;
}