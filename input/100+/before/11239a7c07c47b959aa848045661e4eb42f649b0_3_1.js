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
        //res[r]._id = res[r]._id.slice(1).join('/')
        res[r]._id = res[r]._id.split('/');
        res[r]._id = res[r]._id.pop();
      }
    }
  }
  if(res) {
    callback(err, res);
  } else {
    return callback(err, res)
  }
  }