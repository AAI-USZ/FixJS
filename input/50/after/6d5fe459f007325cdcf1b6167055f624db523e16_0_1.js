function(err, value) {
      if(ERR(err, callback)) return;
      callback(null, {lastEdited: value});
    }