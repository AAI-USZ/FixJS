function(req, res) {
    renderCachableView(req, res, 'signup.ejs', {title: 'Sign Up', fullpage: false});
  }