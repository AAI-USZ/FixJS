function(callback) {
    var cookie, db;
    cookie = [];
    db = new sqlite3.Database(WEIBO_COOKIE_PATH);
    db.serialize(function() {
      return db.all("select host_key, path, secure, expires_utc, name, value from cookies where host_key='.weibo.com'", function(err, rows) {
        var row, _i, _len;
        if (!err) {
          for (_i = 0, _len = rows.length; _i < _len; _i++) {
            row = rows[_i];
            cookie.push(row.name + "=" + row.value);
          }
        }
        return callback(err, cookie.join(';'));
      });
    });
    return db.close();
  }