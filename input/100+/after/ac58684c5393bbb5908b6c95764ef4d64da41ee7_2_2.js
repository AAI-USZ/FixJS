function sendFile(status, filepath){
    var self = this;
    if (arguments.length === 2) {
      this.path = path.resolve(filepath);
      this.status = status;
    } else {
      this.path = path.resolve(status);
    }

    fs.stat(this.path, function(err, stat){
      if (err || !stat.isFile()) {
        self.send(404);
      } else {
        self.mimetype = mime.lookup(this.path);
        fs.readFile(self.path, function(err, buffer){
          if (err || !stat.isFile()) {
            self.send(500);
          } else {
            self.data = buffer;
            self.dispatch();
          }
        });
      }
    });
  }