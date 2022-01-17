function(json){
  // TODO lookup class corresponding in global registry and instantiate
  //var cl  = JRObject.class_registry[json['json_class']];
  var obj = json['data'];
  obj.json_class = json['json_class'];
  for(var p in obj){
    if(JRObject.is_jrobject(obj[p]))
      obj[p] = JRObject.from_json(obj[p]);
    else if(typeof(obj[p]) == "object"){ // handle arrays
      for(var i in obj[p])
        if(JRObject.is_jrobject(obj[p][i]))
          obj[p][i] = JRObject.from_json(obj[p][i]);
   }
  }
  return obj;
}