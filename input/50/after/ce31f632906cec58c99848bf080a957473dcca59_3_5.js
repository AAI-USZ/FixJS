function(req, res) {
    renderCachableView(req, res, 'idp_auth_complete.ejs', {
      title: _('Sign In Complete'),
      fullpage: false
    });
  }