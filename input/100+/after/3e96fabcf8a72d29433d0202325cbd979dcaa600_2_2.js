function createUserSession(req, res, user, next) {

  var isAdmin = isUserAdmin(user);

  // Create session
  req.session.user = {username:user.username, isAdmin:isAdmin, id:user._id,language:user.language,roles:user.roles};
  req.session.save(function(err) {
    next(err);
  });
}