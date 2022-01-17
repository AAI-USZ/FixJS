function(db) {
      var _this = this;
      if (!(db != null)) {
        db = this.db;
      }
      console.log("initializing DB");
      db.changeVersion("", Readings.config.get('db_version'));
      return $.ajax("initdb.sql", {
        type: "GET",
        dataType: 'text',
        success: function(sql) {
          var create;
          sql = sql.split(/;\n/);
          sql = sql.slice(1, -2);
          create = function(tx) {
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
          };
          return db.transaction(create);
        },
        error: function() {
          return console.error("can't get initial sql");
        }
      });
    }