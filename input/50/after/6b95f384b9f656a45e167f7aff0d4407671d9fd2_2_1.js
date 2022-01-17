function(done){
    var db= start({ uri: 'mongodb://localasdfads/fakeeee', noErrorListener: 1 })
    db.on('error', function () {
      // this callback has no params which triggered the bug #759
      done();
    });
  }