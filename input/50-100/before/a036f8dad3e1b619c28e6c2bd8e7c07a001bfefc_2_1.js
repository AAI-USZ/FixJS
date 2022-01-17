function(cb) {
    var app = createdApp || apps[0];

    if(app) {
      fh.config.list(options, app.guid, "all", function(error, data) {
        console.log(arguments);
        cb(error);
      });
    }
    else {
      console.log("No apps to read");
    }
  }