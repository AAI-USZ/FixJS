function(err, p) {
          if(err) {
            if(callback) return callback(err);
          }

          var rstringi = rstring + '_ids';

          if (p[rstringi] && !Array.isArray(p[rstringi])) {
            p[rstringi] = [p[rstringi]];
          }
          p[rstringi] = p[rstringi] || [];

          if (p[rstringi].indexOf(cid) < 0) {
            p[rstringi].push(cid);
          }

          p.save(function(err, result){
            callback(err, c);
          });
        }