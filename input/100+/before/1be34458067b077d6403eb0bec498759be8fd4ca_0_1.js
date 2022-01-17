function(tx) {
            var stmt, _i, _len, _results;
            _results = [];
            for (_i = 0, _len = sql.length; _i < _len; _i++) {
              stmt = sql[_i];
              console.log(stmt);
              _results.push(tx.executeSql(stmt, [], function(tx, rs) {
                return true;
              }, function(tx, err) {
                return console.error(err);
              }));
            }
            return _results;
          }