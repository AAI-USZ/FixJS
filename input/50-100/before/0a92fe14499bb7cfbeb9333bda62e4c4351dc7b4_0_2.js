function(err,data){
    if(err)return cb(err);
    
    var max = data.list.length, app = {};
    for(var i = 0; i < max; i++){
        
        if(data.list[i].id === guid){ return cb();};
    }
    //not found so no app

    return cb("no guid found");

  }