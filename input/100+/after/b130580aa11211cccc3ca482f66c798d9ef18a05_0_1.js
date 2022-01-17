function (id, callback) {
  if (this.schema.properties._id && this.schema.properties._id.sanitize) {
    id = this.schema.properties._id.sanitize(id);
  }

  var newid, oldid;
  if (id && id._id) {
    newid = this.lowerResource + "/" + id._id;
    oldid = id._id;
  }
  else if(Array.isArray(id)) {
    for(var i in id) {
      id[i] = this.lowerResource + "/" + id[i];
    }
    newid = id;
  }
  else if(id) {
    newid = this.lowerResource + "/" + id;
    oldid = id;
  }
  else {
    if(callback) {
      return callback(new Error('key is undefined'));
    }
    return;
  }

  this._request('get', newid, function(err, res){
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
  });
}