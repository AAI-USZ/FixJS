function(email, cb) {
  client.query(
    "SELECT verified FROM email WHERE address = ?", [ email ],
    function(err, rows) {
      if (rows && rows.length > 0) cb(err, !!rows[0].verified);
      else cb('no such email');
    }
  );
}