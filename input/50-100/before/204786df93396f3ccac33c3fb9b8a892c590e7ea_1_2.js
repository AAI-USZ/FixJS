function() {
  return function (req, res, next) {
    console.log("middleware => security.isAdmin", req.session);
    if(req.session.isAdmin === true) {
      console.log("middleware => security.isAdmin: TRUE");
      return next();
    } else {
      console.log("middlware => security.isAdmin: FALSE");
      throw new Error('unauthorized');
    } 
  };
}