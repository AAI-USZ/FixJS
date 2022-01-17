function(err, res){
    if (res && res[key] && typeof oldid !== 'undefined') {
      res[key] = oldid;
    }
    callback(err, res);
  }