function add(object) {
    setup(function(done) {
      var store = subject.db.getStore('Calendar');
      var model = store._createModel(object);
      store.once('persist', function() {
        done();
      });
      store.persist(model);
    });
  }