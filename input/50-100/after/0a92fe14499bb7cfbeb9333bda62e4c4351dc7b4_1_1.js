function (err, results){
      if (err) return main_cb(err);
      var data = {};
      for (var i=0; i<results.length; i++) {
        data[destinations[i]] = results[i];
      }
      return main_cb(undefined, data);
    }