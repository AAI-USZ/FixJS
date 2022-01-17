function(req){
    req.sessionID = utils.uid(24);
    req.session = new Session(req);
    req.session.cookie = new Cookie(req, cookie);
  }