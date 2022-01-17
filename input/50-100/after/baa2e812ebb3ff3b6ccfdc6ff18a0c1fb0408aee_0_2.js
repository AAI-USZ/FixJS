function(err, app){
    if(err) return callback(err);

    if( delSvcFlag ){
      var deleteService = function(service, callback) {
        self.deleteService(service, callback);
      };

      async.map(app.services, deleteService, function(err, results){
        if(err) return callback(err);

        self.del(path, callback);
      });
    }else{
      self.del(path, callback);
    }
  }