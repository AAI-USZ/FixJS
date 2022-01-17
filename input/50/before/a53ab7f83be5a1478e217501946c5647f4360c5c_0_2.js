function(err, data) {
    if (err) {
      console.warn("Failed connecting to FitBit. Clearing session.", err);
      fitbit.logout(req);
      callback(err, null)
    } else {
      callback(null, data);
    }
  }