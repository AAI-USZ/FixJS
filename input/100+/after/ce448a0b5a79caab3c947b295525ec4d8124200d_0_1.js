function(json){
  // TODO lookup class corresponding to json['json_class'] in global registry and instantiate
  var obj = json['data'];
  for(p in obj){
    if(JRObject.is_jrobject(obj[p]))
      obj[p] = JRObject.from_json(obj[p]);
    else if(typeof(obj[p]) == "object"){ // handle arrays
      for(i in obj[p])
        if(JRObject.is_jrobject(obj[p][i]))
          obj[p][i] = JRObject.from_json(obj[p][i]);
   }
  }
  return obj;
}