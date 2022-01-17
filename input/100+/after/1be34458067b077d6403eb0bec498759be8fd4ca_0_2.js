function(db) {
      var unneded_stmts,
        _this = this;
      unneded_stmts = function(stmt, idx) {
        return stmt.indexOf("PRAGMA") === 0 || stmt.indexOf("BEGIN TRANSACTION") === 0 || stmt.indexOf("COMMIT") === 0 || /^\s*$/.exec(stmt);
      };
      if (!(db != null)) db = this.db;
      console.log("initializing DB");
      db.changeVersion("", Readings.config.get('db_version'));
      return $.ajax(Readings.config.get('initdburl'), {
        type: "GET",
        dataType: 'text',
        success: function(sql) {
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
        },
        error: function() {
          return console.error("can't get initial sql");
        }
      });
    }