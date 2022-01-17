function(err, app){
    if(err) return callback(err);

    var deleteService = function(service, callback) {
      self.deleteService(service, callback);
    };

    async.map(app.services, deleteService, function(err, results){
      if(err) return callback(err);

      var path = '/apps/' + name;
      self.del(path, callback);
    });
  }