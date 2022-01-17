function(name, description, action){
  var __ref, __key;
  if (!action) {
    __ref = [description, ''], action = __ref[0], description = __ref[1];
  }
  Aliases[__key = name.split(/\W+/).filter(String).map(function(it){
    return it[0];
  }).join('')] || (Aliases[__key] = name);
  return Tasks[name] = {
    name: name,
    description: description,
    action: action
  };
}