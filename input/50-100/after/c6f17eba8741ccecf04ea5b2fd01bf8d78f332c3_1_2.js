function(err, db){
    test.equal(null, err);

    db.close(function(){
      test.equal(null, err);

      db.open(function(){
        test.equal(null, err);

        db.close();
        test.done();
      });
    });
  }