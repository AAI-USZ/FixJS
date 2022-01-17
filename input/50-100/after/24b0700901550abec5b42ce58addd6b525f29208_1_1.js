function(req, res, next) {
    console.log("middleware.authenticated session =>\n", req.session);
    if (req.session && req.session.userId) {
      return next();
    } else {
      throw new Error('unauthorized');
    }
  }