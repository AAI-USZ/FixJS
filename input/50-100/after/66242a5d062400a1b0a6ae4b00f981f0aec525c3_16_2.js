function(done) {
    testSupport.calendar.clearStore('accounts', done);
    subject._cached = {};
  }