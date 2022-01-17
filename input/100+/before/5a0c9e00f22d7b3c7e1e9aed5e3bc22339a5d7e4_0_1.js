function (table, query, value) {
      var nextKey = query.shift();
      if (nextKey.length <= 0) {
        throw new Error('Invalid query.');
      }

      if (nextKey[0] === ':') {
        if (table.hasOwnProperty('^n')) {
          return false;
        }
        table['^n'] = nextKey.substring(1);
        nextKey = '^v';
      }
      if (query.length === 0) {
        table[nextKey] = value;
        return true;
      } else {
        var nextTable = table.hasOwnProperty(nextKey) ?
              table[nextKey] : table[nextKey] = {};
        return set(nextTable, query, value);
      }
    }