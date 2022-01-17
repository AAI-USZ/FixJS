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
              }