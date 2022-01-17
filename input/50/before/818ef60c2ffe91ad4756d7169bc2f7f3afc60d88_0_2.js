function(req, res) {
    // !cachable!  token is embedded in DOM
    res.render('verify_email_address.ejs', {
      title: 'Complete Registration',
      fullpage: true,
      token: req.query.token,
      enable_development_menu: config.get('enable_development_menu')
    });
  }