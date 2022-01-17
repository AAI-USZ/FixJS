function(req, res) {
    renderCachableView(req, res, 'tos.ejs', {title: 'Terms of Service', fullpage: false});
  }