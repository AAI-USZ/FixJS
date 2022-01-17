function(req, res, next ) {
    metrics.userEntry(req);
    renderCachableView(req, res, 'dialog.ejs', {
      title: 'A Better Way to Sign In',
      layout: 'dialog_layout.ejs',
      useJavascript: true,
      production: config.get('use_minified_resources')
    });
  }