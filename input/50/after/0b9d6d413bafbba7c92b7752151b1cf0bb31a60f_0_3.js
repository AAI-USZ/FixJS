function(req,res) {
    renderCachableView(req, res, 'index.ejs', {title: _('A Better Way to Sign In'), fullpage: true});
  }