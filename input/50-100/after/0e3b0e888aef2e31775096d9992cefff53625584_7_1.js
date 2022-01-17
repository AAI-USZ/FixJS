function(options, callback){
    for(var i in this.matches){
      if(options.url.match(this.matches[i])){
        callback();
        return;
      }
    }  
    callback('STOP');
  }