function(options, callback){
    if(this.in_time === true){
      callback(null, true);
      return;
    }
    callback(null, false);
  }