function(err, result) {
    result = result && result.documents;

    if(err != null) {
      callback(err);
    } else if(result[0].err != null) {
      callback(self.db.wrap(result[0]), null);
    } else if(result[0].errmsg != null && !result[0].errmsg.match(eErrorMessages)) {
      // Workaround due to 1.8.X returning an error on no matching object
      // while 2.0.X does not not, making 2.0.X behaviour standard
      callback(self.db.wrap(result[0]), null, result[0]);
    } else {
      return callback(null, result[0].value, result[0]);
    }        
  }