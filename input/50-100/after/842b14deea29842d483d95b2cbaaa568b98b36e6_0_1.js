function setupMiddleware() {
  app.store = new require('connect/lib/middleware/session/memory');
  app.use(flatiron.plugins.http);
  app.http.before = [
    connect.cookieParser('secret')
  , connect.cookieSession({
      cookie: { 
        domain: config.get('domain')
      , store: app.store
      }
    })
  , middleware.pageRewrite
  , ecstatic(__dirname + '/client')
  ];
}