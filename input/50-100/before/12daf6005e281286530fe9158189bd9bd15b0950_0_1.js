function (sql, args, callback) {
        if (!callback && typeof args === 'function') {
          callback = args;
          args = undefined;
        }

        return callNative('eachAsync', sql, args, function (row) {
          callback(toObject(row));
        }).then(function () {
          return that;
        }, wrapComException);
      }