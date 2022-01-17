function(req,res,next) {
  if(req.session.user) {
    next();
  } else {
    res.send("<b>Not logged in, please enter your andrew_id</b>");
  }
}