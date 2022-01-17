function(err, results){
        if(err) return callback(err);

        self.del(path, callback);
      }