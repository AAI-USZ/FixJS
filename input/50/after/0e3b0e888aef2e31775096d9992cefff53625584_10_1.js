function(options, callback){
    if(this.users.indexOf(options.username) != -1) callback();
    else                                           callback('STOP');
  }