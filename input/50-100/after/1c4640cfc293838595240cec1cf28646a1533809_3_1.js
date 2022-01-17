function downloadModule(options, cli, next) {
  var toPath = calipso.app.path() + "/modules/downloaded/";
  var fromUrl = options[1];
  download('module', fromUrl, toPath, cli, function(err,moduleName,path) {
      if(err) {
        next(err);
      } else {
        installViaNpm(moduleName,path,next);
      }
  });
}