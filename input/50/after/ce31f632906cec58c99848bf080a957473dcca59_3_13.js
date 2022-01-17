function(req,res) {
    renderCachableView(req, res, 'confirm.ejs', {title: _('Reset Password')});
  }