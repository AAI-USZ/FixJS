function(directory, recursive) {
  var self = this;
  var timeout;


  // currently will only watch the directory without sub directories
  // TODO: support watching subdirectories
  if(!fs.statSync(directory).isDirectory()) {
    this.handleError(new Error("\"" + directory + "\" is not a directory" ));
  }

  if(recursive) {
    fs.readdir(directory, function(err, files) {

      for(var i = 0, il = files.length; i < il; i++) {
        var file = path.join(directory, files[i]);

        if(fs.statSync(file).isDirectory()) {
          self.listenTo(file, true);
        }
      }

    });
  }

  fs.watch(directory, function(e, filename) {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      self.handleFileSystemChange(e, filename);
    }, 10);
  });
}