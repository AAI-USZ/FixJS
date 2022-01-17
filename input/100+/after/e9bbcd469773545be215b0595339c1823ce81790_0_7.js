function(ids, cb) {
              var id, sync, _i, _j, _len, _len2, _results;
              if (cb != null) {
                sync = MITHGrid.initSyncronizer(cb);
                if (ids.length != null) {
                  for (_i = 0, _len = ids.length; _i < _len; _i++) {
                    id = ids[_i];
                    sync.increment();
                    that.getItem(id, function(err, res) {
                      cb(err, res);
                      return sync.decrement();
                    });
                  }
                } else {
                  sync.increment();
                  that.getItem(ids, function(err, res) {
                    cb(err, res);
                    return sync.decrement();
                  });
                }
                return sync.done();
              } else {
                if (ids.length) {
                  _results = [];
                  for (_j = 0, _len2 = ids.length; _j < _len2; _j++) {
                    id = ids[_j];
                    _results.push(that.getItem(id));
                  }
                  return _results;
                } else {
                  return [that.getItem(ids)];
                }
              }
            }