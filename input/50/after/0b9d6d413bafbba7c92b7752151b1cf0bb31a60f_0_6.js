function(req, res) {
    res.local('util', util);
    renderCachableView(req, res, 'forgot.ejs', {
      title: _('Forgot Password'),
      fullpage: false,
      enable_development_menu: config.get('enable_development_menu')
    });
  }