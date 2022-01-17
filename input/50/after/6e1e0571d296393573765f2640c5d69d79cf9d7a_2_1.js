function(req, res, next) {
   // Successful authentication, redirect to profile.
   console.log("USER: ", req.user);
   res.redirect('/profile');
  }