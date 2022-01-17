function() {
    app.set('views', __dirname + '/views');
    app.use(express.static(__dirname + '/views'));
    app.use(app.router);
    app.set("view options", {
      layout: false
    });
    return app.register('.html', {
      compile: function(str, options) {
        return function(locals) {
          return str;
        };
      }
    });
  }