function(prefix){
  prefix = prefix || '';
  return function(key, val){
    var name = prefix + key.toUpperCase().split(' ').join('_');
    return process.env[name] || val;
  }
}