function(cb) {
    var app = apps[0];
    if(app) {
      fh.files.list(options, app.id, function(error, data){
        console.log(arguments);
        cb(error);
      });
    }
  }