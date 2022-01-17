function(options, callback){
    for(var i in this.ips){
      if(this.ips[i].contains(options.ip)){
        callback();
        return;
      }
    }  
    callback('STOP');
  }