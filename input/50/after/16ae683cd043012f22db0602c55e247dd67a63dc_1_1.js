function generate(lessObj , opts){
    dist = "";
    depth = 0;
    
    makeLessSrc(lessObj , opts);
    return dist;
  }