function (that) {
    app.m.Session.expires({ endkey: (new Date()).toISOString() }, function (err, res) {
      if (err) console.log('Failed to reap (view) -- ' + err);
      resourceful.async.forEachSeries(res.map(function (r) {
        return r.id.split('/').slice(1).join('/');
      }), function (id, cb) {
        app.m.Session.destroy(id, cb);
      }, function (err) {
        if (err) console.log('Failed to reap -- ' + err);
      });
    });
  }