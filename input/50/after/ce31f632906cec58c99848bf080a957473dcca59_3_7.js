function(req, res) {
    renderCachableView(req, res, 'signin.ejs', {title: _('Sign In'), fullpage: false});
  }