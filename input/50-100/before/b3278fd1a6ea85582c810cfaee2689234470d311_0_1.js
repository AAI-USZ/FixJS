function(key, val){
  var name = key.toUpperCase().split(' ').join('_');
  return process.env[name] || val;
}