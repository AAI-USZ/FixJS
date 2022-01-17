function(err,docs) {
      for(var i = 0; i< docs.length; i++) {
        totals = self.fromDb(docs[i],totals);
      }
      callback(totals);
    }