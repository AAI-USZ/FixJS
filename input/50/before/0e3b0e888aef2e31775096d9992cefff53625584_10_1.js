function(options, callback){
    callback(null, this.users.indexOf(options.username) != -1);
  }