function(err,rows) {
      try {
        if (err) {
          callback(err);
        }
        if (rows.length === 0) return callback();
        callback(null, JSON.parse(rows[0].data));
      } catch (err) {
        callback(err);
      }
    }