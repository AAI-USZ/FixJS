function(err, data) {
    if(err) throw err;
    res.end(JSON.stringify(data));
  }