function(req, res) {
    renderCachableView(req, res, 'about.ejs', {title: _('About'), fullpage: false});
  }