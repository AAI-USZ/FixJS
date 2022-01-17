function createUserSession(req, user, next) {

  var isAdmin = isUserAdmin(user);

  // Create session
  req.session.user = {username:user.username, isAdmin:isAdmin, id:user._id,language:user.language,roles:user.roles};
  req.session.save(function(err) {
    
    // SET A COOKIE WTH SOME USER DATA
    // put some of the user information in a cookie so that most pages can be
    // personalized with javascript - a common strategy for aggressive page caching
    // TODO - THERE IS SOME BUG WHEREIN THE COOKIE GETS UNSET IF ON AN ADMIN PAGE
    // TODO - make sure this is the appropriate place for this
    if(req.session.user){
      if(!req.cookies.userData){
        res.cookie('userData', JSON.stringify(req.session.user));
      }
    } else {
      res.clearCookie('userData');
    }
    
    next(err);
  });
}