function(callback) {
  var tasks = [];

  this.clients.forEach(function(client) {
    tasks.push(function(cb) {
      client.quit(cb);
    });
  });
  async.parallel(tasks, function(err, replies) {
    if (callback) {
      callback(err, replies);
    }
  });
}