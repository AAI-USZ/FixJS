function(err, res) {
    if(err)
      util.puts("error retreiving data from " + couchUrl + ": '" + err + "'");
    else {
      var data = _(res.rows).pluck("doc")
      callback(data);
    }
  }