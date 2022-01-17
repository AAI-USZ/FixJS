function(req, res) {
    renderCachableView(req, res, 'privacy.ejs', {title: 'Privacy Policy', fullpage: false});
  }