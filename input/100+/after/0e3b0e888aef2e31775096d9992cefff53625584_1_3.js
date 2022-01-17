function(options, callback){
  var self = this;
  
  if(this.types.length > 0){
    async.parallel(this.type_callbacks(options), function(err, results){
      if(err){
        //if there was an error == some type did not match
        callback(null);
      }else{        
        callback(self.allowed ? true : self.redirect);
      }
    });
  }else{
    //if there are no matches defined - it matches!
    callback(self.allowed ? true : self.redirect);
  }
}