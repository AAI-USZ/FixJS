function(email, cb) {
  client.query(
    "SELECT COUNT(*) as N FROM staged WHERE email = ?", [ email ],
    function(err, rows) {
      cb(err, rows && rows.length > 0 && rows[0].N > 0);
    }
  );
}