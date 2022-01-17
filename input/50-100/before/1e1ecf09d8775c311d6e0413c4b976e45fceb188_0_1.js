function setSessionToLoadedUser (req, res) {
  if (req.loaded_user && req.loaded_user instanceof User && loaded_user.__inDB) {
    req.session.logged_in = true;
    var userdata = req.session.userdata = req.loaded_user.allProperties();
    res.ok({user: userdata});
  } else {
    throw new UserError('Can\'t set session to req.loaded_user because it\'s not a valid and loaded nohm model.');
  }  
}