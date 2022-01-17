function (fn) {
  var count = this.connections.length
    , error

  this.connections.forEach(function(conn){
    conn.close(function(err){
      if (error) return;

      if (err) {
        error = err;
        if (fn) return fn(err);
        throw err;
      }

      if (fn)
        --count || fn();
    });
  });
  return this;
}