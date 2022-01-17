function addUserId(db, email, callback) {
  db.incr('user:id:id', function(err, id) {
    if (err) {
      callback(err);
    } else {
      // redis values must be strings
      id = String(id);

      // user:id:[userEmail] => [userId]
      db.set('user:id:' + email, id, function(err, status) {
        if (err) {
          callback(err);
        } else {
          // user:email:[userId] => [userEmail]
          db.set('user:email:' + id, email, function(err, status) {
            if (err) {
              callback(err);
            } else {
              callback(null, id);
            }
          });
        }
      });
    }
  });
}