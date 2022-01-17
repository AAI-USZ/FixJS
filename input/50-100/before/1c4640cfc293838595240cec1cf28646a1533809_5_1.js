function downloadTheme(options, cli, next) {
  var toPath = calipso.app.path + "/themes/downloaded/";
  var fromUrl = options[1];
  download('theme', fromUrl, toPath, cli, function(err, themeName, path) {
      if(err) {
        next(err);
      } else {
        console.log("Theme ".green + themeName + " was installed successfully.".green);
        next();
     }
  });
}