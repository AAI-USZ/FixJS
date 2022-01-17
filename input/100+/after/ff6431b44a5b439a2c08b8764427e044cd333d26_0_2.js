function () {
          return db.oneAsync('SELECT COUNT(*) AS cnt FROM (' + this._sql + ')', this._args)
            .then(function (row) { return row.cnt; });
        }