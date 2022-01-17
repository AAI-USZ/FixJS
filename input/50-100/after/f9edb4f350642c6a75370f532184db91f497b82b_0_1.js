function(err,docs) {
      if(err) sys.log(err);
      if(!docs) return;

      for(var i = 0; i< docs.length; i++) {
        totals = self.fromDb(docs[i],totals);
      }
      callback(totals);
    }