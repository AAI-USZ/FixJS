function(options, callback){
    var parts = url.parse(options.url);
    
    for(var i in this.file_types){
      if(parts.pathname.match('\\.' + this.file_types[i])){
        callback(null, true);
        return;
      }
    }  
    callback(null, false);
  }