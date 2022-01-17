function (error, clientref) {
    if (error) throw error;
    if (user && password) {
console.log('user: ' + user);
console.log('pass: ' + password);
console.log('database: ' + database);
      clientref.authenticate(user, password, function (error, result) {
        if (error) { console.warn(error); return; }
        if (result == false) { console.warn(result); return; }
        callback(clientref);
      });
    } else {
      callback(clientref);
    }
  }