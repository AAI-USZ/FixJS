function(err, buffer){
          if (err || !stat.isFile()) {
            self.send(500);
          } else {
            self.data = buffer;
            self.dispatch();
          }
        }