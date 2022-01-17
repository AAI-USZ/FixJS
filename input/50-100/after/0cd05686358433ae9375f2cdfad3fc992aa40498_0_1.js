function(err, rows) {
        var row, _i, _len;
        if (!err) {
          for (_i = 0, _len = rows.length; _i < _len; _i++) {
            row = rows[_i];
            cookie.push(row.name + "=" + row.value);
          }
        }
        return callback(err, cookie.join(';'));
      }