function(event, callback){
    return this.each(function(){
      remove(this, event, callback);
    });
  }