function(err, buffer){
          if (err) {
            self.send(500);
          } else {
            self.data = buffer;
            self.dispatch();
          }
        }