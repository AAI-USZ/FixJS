function(data, keys){
    var node = data;
    for(i in keys){
      var key = keys[i];
      if(/\[\]$/.test(key)){
        key = key.substring(0, key.length - 2);
        if(typeof node[key] === 'undefined'){
          node[key] = []
        }
      }else{
        if(typeof node[key] === 'undefined'){
          node[key] = {}
        }
      }
      node = node[key];
    }
    return node;
  }