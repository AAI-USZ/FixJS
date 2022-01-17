function (error, clientref) {
    if (error) throw error;
    if (user && password) {
      db.authenticate(user, password, function (error, result) {
        if (error) { console.warn(error); return; }
        callback(db);
      });
    } else {
      callback(db);
    }
  }