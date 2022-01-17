function(sql) {
          var create;
          sql = sql.split(/;\n/);
          sql = $.grep(sql, unneded_stmts, true);
          create = function(tx) {
            var stmt, _i, _len, _results;
            _results = [];
            for (_i = 0, _len = sql.length; _i < _len; _i++) {
              stmt = sql[_i];
              _results.push(tx.executeSql(stmt, [], function(tx, rs) {
                return true;
              }, function(tx, err) {
                console.error("error for " + stmt);
                return console.error(err);
              }));
            }
            return _results;
          };
          return db.transaction(create);
        }