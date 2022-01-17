function(err,data) {
      var info;
      if (data) {
        info = JSON.parse(data);
      } else {
        info = {};
      }
    cb(null,info);
  }