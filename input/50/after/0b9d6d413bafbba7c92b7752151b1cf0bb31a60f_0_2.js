function(req,res) {
    renderCachableView(req, res, 'cookies_disabled.ejs', {
      title: _('Cookies Are Disabled'),
      layout: 'dialog_layout.ejs',
      useJavascript: false
    });
  }