function (fn) {
  var count = this.connections.length;
  this.connections.forEach(function(conn){
    conn.close(function(err){
      if (err) return fn(err);
      if (fn)
        --count || fn();
    });
  });
  return this;
}