function(params, fn, done) {
  var dead = false;
  var results = [];
  var q = async.queue(function worker(task, callback) {
    if (dead) return;
    fn(task, callback);
  }, 10);
  q.drain = function () {
    if (dead) return;
    done(null, results);
  };
  params.forEach(function (param, idx) {
    q.push(param, function (err, data) {
      if (dead) return;
      if (err) {
        dead = true;
        done(err);
      }
      results[idx] = data;
    });
  });
}