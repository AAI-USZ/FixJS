function (obj, next) {
      obj = obj._id || obj;
      obj = obj.split('/').slice(1).join('/');

      factory.get(obj, function (e, p) {
        if (e) { return next(e); }

        p[rstringp](function (e, c) {
          if (e) { return next(e); }

          resourceful.async.forEachSeries(c, function (i, cb) {
            i.destroy(cb);
          }, function (e) {
            next(e);
          });
        });
      });
    }