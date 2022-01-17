function(req, res) {
    renderCachableView(req, res, 'signin.ejs', {title: 'Sign In', fullpage: false});
  }