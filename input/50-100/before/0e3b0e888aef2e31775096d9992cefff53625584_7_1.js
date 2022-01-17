function(options, callback){
    for(var i in this.matches){
      if(options.domain.match(this.matches[i])){
        callback(null, true);
        return;
      }
    }  
    callback(null, false);
  }