function(req) {

  var self = this;
  if (!self.permit && self.options.permit) self.permit = self.options.permit;
  if (self.permit) {

    var user = req.session.user;
    var isAdmin = req.session.user && req.session.user.isAdmin;

    if (isAdmin) return {
      allow: true
    }; // Admins always access everything
    // Else check for a specific permission
    if (user) {
      return self.permit(user);
    } else {
      return {
        allow: false,
        msg: 'You must be a logged in user to view that page'
      };
    }

  } else {
    return {
      allow: true
    };
  }

}