function(done) {
      var store = subject.db.getStore('Calendar');
      store.load(function(err, data) {
        results = data;
        done();
      });
    }