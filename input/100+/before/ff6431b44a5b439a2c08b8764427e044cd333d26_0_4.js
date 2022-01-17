function (db, sql, args, keyColumnName, groupKeyColumnName) {
      this._dataAdapter = {
        _sql: sql,
        getCount: function () {
          return db.oneAsync('SELECT COUNT(*) AS cnt FROM (' + this._sql + ')', args)
            .then(function (row) { return row.cnt; });
        },
        itemsFromIndex: function (requestIndex, countBefore, countAfter) {
          var items,
              limit = countBefore + 1 + countAfter,
              offset = requestIndex - countBefore,
              that = this;

          return this.getCount().then(function (totalCount) {
            return db.mapAsync(
              'SELECT * FROM (' + that._sql + ') LIMIT ' + limit + ' OFFSET ' + offset,
              function (row) {
                var item = {
                  key: row[keyColumnName].toString(),
                  data: row
                };
                if (groupKeyColumnName) {
                  if (!row.hasOwnProperty(groupKeyColumnName) || row[groupKeyColumnName] === null) {
                    throw "Group key property not found: " + groupKeyColumnName;
                  }
                  item.groupKey = row[groupKeyColumnName].toString();
                }
                return item;
              }).then(function (items) {
                return {
                  items: items,
                  offset: countBefore,
                  totalCount: totalCount
                };
              });
          });
        },
        setNotificationHandler: function (notificationHandler) {
          this._notificationHandler = notificationHandler;
        },
        getNotificationHandler: function () {
          return this._notificationHandler;
        },
        setQuery: function (sql) {
          this._sql = sql;
        }
      };

      this._baseDataSourceConstructor(this._dataAdapter);
    }