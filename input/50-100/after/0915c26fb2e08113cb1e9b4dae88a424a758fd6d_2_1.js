function(key){
    var val = obj[key];
    if (0 == val.indexOf('s:')) {
      ret[key] = exports.unsign(val.slice(2), secret);
      delete obj[key];
    }
  }