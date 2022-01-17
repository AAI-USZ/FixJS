function(req, res) {
    renderCachableView(req, res, 'tos.ejs', {title: _('Terms of Service'), fullpage: false});
  }