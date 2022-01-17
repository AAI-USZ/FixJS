function(req, res) {
    // !cachable!  email embedded in DOM
    res.render('forgot.ejs', {
      title: 'Forgot Password',
      fullpage: false,
      email: req.query.email,
      enable_development_menu: config.get('enable_development_menu')
    });
  }