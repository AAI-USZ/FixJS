function(err, res){
    //
    // Remap back original ids
    //
    if(res && typeof res._id !== 'undefined') {
      res._id = oldid;
    }
    if(Array.isArray(res)) {
      for(var r in res) {
        if (res[r] && res[r]._id) {
          res[r]._id = res[r]._id.split('/').slice(1).join('/')
        }
      }
    }
    if(res) {
      callback(err, res);
    } else {
      return callback(err, res)
    }
  }