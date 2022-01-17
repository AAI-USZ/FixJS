function (db, sql, args, keyColumnName, groupKeyColumnName) {
      this._dataAdapter = {
        setQuery: function (sql, args) {
          this._sql = sql;
          this._args = args;
        },
        getCount: function () {
          return db.oneAsync('SELECT COUNT(*) AS cnt FROM (' + this._sql + ')', this._args)
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
              that._args,
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
        }
      };

      this._dataAdapter.setQuery(sql, args);
      this._baseDataSourceConstructor(this._dataAdapter);
    }