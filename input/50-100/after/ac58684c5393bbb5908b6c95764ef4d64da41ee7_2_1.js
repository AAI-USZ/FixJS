function(err, stat){
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
    }