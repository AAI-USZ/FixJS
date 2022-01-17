function(filename, options) {
  options || (options = {});
  options.extension = options.extension === undefined ? true : options.extension;
  var fileExtension = path.extname(filename);
  var mimeType = mime.lookup(fileExtension);

  var destPath = path.join(this.dest, filename.slice(this.src.length));
  
  if(filename.match(/node_modules/)) {
    destPath = path.join(this.destJSRoot, "vendor", filename.replace(/^.*\/node_modules/, ""));
  } else if(filename.match(/vendor/)){
    destPath = path.join(this.destJSRoot, "vendor", filename.replace(/^.*\/vendor/, ""));
  }

  var newFileName = path.basename(filename, fileExtension);

  if(options.version) {
    newFileName = newFileName + "-" + options.version;
  }

  if(options.extension) {
    newFileName = newFileName + "." + mime.extension(mimeType);
  }

  var absPath = path.join(path.dirname(destPath), newFileName);
  
  if(options.fullpath) {
    return absPath;
  } else {
    return path.relative(this.dest, absPath);
  }  
}