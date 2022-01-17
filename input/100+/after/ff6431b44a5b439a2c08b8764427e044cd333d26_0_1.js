function (totalCount) {
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
          }