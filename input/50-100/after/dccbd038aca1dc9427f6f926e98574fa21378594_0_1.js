function(id){
    if(id.indexOf("/")===-1){
      id = config.path+"/"+id;
    }
    if(id.indexOf(".")<1){
      id += ".js";
    }
    return id;
  }