function(err, p) {
          if(err) { return next(err); }
          var key = factory.lowerResource + '_ids';
          if(~p[key].indexOf(obj)) {
            p[key].splice(p[key].indexOf(obj), 1);
            p.save(function(err) {
              if(err) { return next(err); }
              next();
            });
          }
          else {
            next();
          }
        }