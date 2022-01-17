function(err, services){
    if( err ){
      return callback(err, []);
    }else{
      var serviceNames = [];
      for (var i=0; i<services.length; i++) {
        var serv = services[i];
        serviceNames.push(serv.name);
      }
      if(serviceNames.indexOf(service) == -1) return callback(new Error('Service not found: ' + service));

      self.del('/services/' + service, callback);
    }
  }