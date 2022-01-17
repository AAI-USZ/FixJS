function (dirname) {
  var resolveWebPath = function (relative) {
    return path.join(dirname, relative);
  };
  var resolvePath = function (relative) {
    var web_path = resolveWebPath(relative);
    if (fs.existsSync(web_path)) {
      return web_path;
    }
    return resolveAppPath(relative);
  };
  var createStaticResourceServer = function (relative) {
    var source_dir = resolvePath(relative);
    return new darkside.StaticResourceServer(source_dir);
  };

  var app = darkside.createApplication(APP_DIR);
  app.server = darkside.createHTTPServer();
  app.server.setRouter(app.router);

  app.router.setRouteTypeHandler('static', createStaticResourceServer);
  app.services.setServiceTypeHandler('include', include);
  app.services.setServiceTypeHandler('path', resolvePath);

  app.router.setRouteDeclaration(path.join(APP_DIR, 'routes.declaration'));
  app.services.setServiceDeclaration(path.join(APP_DIR, 'services.declaration'));

  var template_root = resolveWebPath('views');
  if (fs.existsSync(template_root)) {
    app.controller_factory.setTemplateDirectory(template_root);
    app.controller_factory.setOmittableNamespace('front');
  }

  return {
    listen: function (port) {
      app.server.listen(port);
    }
  };
}