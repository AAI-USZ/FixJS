function(err, p) {
          if(err) {
            if(callback) return callback(err);
          }

          //
          // TODO: We shouldn't have to reduce ID's here, something is wrong
          //
          if(p[rstring + '_ids'].length > 0) {
            p[rstring + '_ids'] = p[rstring + '_ids'].reduce(function(i){
              if(typeof i === "string") {
                var x = i.split('/');
                x = x[0];
                if(x === id) {
                  return i;
                }
              }
            });
          }

          if (p[rstring + '_ids'] && !Array.isArray(p[rstring + '_ids'])) {
            p[rstring + '_ids'] = [p[rstring + '_ids']];
          } else {
            p[rstring + '_ids'] = [];
          }

          //
          // Don't double append resource names for self-referencing relationships
          //
          p[rstring + '_ids'].push(c._id || c.id);

          p.save(function(err, result){
            callback(err, child);
          });
        }