function(obj, next) {
      obj = obj._id || obj;
      obj = obj.split('/').slice(1).join('/');

      factory.get(obj, function(e, c) {
        if(e) { return next(e); }

        c[rstring](function(err, p) {
          if(err) { return next(err); }
          var key = factory.lowerResource + '_ids';
          obj = obj.replace(rfactory.lowerResource + '/' + p._id + '/', '');

          if(p[key].indexOf(obj) > -1) {
            p[key].splice(p[key].indexOf(obj), 1);
            p.save(function(err) {
              if(err) { return next(err); }
              next();
            });
          } else {
            next();
          }
        });
      });
    }