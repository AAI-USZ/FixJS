function(err,data) {
    var info = JSON.parse(data);
    cb(null,info);
  }