function(options, callback){
    for(var i in this.ips){
      if(this.ips[i].contains(options.ip)){
        callback(null, true);
        return;
      }
    }  
    callback(null, false);
  }