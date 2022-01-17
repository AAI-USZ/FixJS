function(req, res) {
    res.local('util', util);
    renderCachableView(req, res, 'verify_email_address.ejs', {
      title: 'Complete Registration',
      fullpage: true,
      enable_development_menu: config.get('enable_development_menu')
    });
  }