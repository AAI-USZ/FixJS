function(req, res) {
    renderCachableView(req, res, 'signup.ejs', {title: _('Sign Up'), fullpage: false});
  }