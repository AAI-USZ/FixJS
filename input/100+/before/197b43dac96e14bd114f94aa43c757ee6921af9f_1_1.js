function(query, callback){
  var client = this;
  if (query.results.length < 1){
    callback.apply(client, [undefined, null]);
    return;
  }
  this.getResults(query.results.reverse().map(function(v){return v.resultid;}), function(err, results){
    if (err){
      error_callback(client, callback, err);
      return;
    }
    var r;
    while((r = results.shift()) !== undefined){
      if (r.running())
        continue;
      callback.apply(client, [undefined, r]);
      return;
    }
    callback.apply(client, [undefined, null]);
  });
}