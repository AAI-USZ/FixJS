function(req, res, next ) {
    renderCachableView(req, res, 'dialog.ejs', {
      title: _('A Better Way to Sign In'),
      layout: 'dialog_layout.ejs',
      useJavascript: true,
      production: config.get('use_minified_resources')
    });
  }