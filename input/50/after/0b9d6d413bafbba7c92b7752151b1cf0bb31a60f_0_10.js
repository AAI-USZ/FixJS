function(req, res) {
    renderCachableView(req, res, 'privacy.ejs', {title: _('Privacy Policy'), fullpage: false});
  }