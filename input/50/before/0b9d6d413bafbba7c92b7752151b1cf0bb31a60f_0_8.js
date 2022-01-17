function(req, res) {
    renderCachableView(req, res, 'about.ejs', {title: 'About', fullpage: false});
  }