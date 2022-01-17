function(req, res, next) {
    renderCachableView(req, res, 'relay.ejs', {
      layout: false,
      production: config.get('use_minified_resources')
    });
  }