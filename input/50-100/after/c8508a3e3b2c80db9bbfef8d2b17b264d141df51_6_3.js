function(err, res) {
      _db.hmget("vid", res.split(','), function(err, res) {
        res.forEach(function(row) {
          row = JSON.parse(row);
          len += parseInt(row[0]);
        });
        update(name, {len: len});
      });
    }