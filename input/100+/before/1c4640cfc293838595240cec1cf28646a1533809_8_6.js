function loadAbout(obj, fromPath, file) {

  var fs = calipso.lib.fs;

  var packageFile = calipso.lib.path.join(fromPath, file);

  if (path.existsSync(packageFile)) {
    var json = fs.readFileSync(packageFile);
    try {
      obj.about = JSON.parse(json.toString());
      if (obj.about && obj.about.name) {
        obj.library = obj.about.name;
      } else {
        obj.library = obj.name;
      }
    } catch (ex) {
      obj.about = {
        description: 'Invalid ' + file
      };
    }
  }

}