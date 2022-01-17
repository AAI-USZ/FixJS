function(key){
    var val = obj[key]
      , signed = exports.unsign(val, secret);

    if (signed) {
      ret[key] = signed;
      delete obj[key];
    }
  }