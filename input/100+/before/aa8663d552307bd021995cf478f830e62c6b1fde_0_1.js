function(data, keys){
    var node = data;
    for(i in keys){
      if(typeof node[keys[i]] === 'undefined'){
        node[keys[i]] = {}
      }
      node = node[keys[i]];
    }
    return node;
  }