function(req,res) {
    renderCachableView(req, res, 'confirm.ejs', {title: _('Verify Email Address'), fullpage: false});
  }