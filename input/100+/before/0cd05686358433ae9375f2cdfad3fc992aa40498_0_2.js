function(cookie_str) {
    var cookie, db;
    cookie = [];
    db = new sqlite3.Database(WEIBO_COOKIE_PATH);
    db.serialize(function() {
      db.each("select host_key, path, secure, expires_utc, name, value from cookies where host_key='.weibo.com'", function(err, row) {
        if (!err) {
          return cookie.push(row.name + "=" + row.value);
        }
      });
      return cookie_str = cookie.join(';');
    });
    return db.close();
  }