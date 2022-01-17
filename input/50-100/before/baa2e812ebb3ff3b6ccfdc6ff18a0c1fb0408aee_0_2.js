function(err, results){
      if(err) return callback(err);

      var path = '/apps/' + name;
      self.del(path, callback);
    }