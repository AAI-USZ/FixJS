function(options, callback){
    if(this.in_time === true){
      callback();
      return;
    }
    callback('STOP');
  }