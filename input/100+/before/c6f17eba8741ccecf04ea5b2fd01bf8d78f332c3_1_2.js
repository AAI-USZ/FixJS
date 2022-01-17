function(test) {
  var server = new Server("127.0.0.1", 27017, {auto_reconnect: true, poolSize: 4, ssl:useSSL});
  var db = new Db(MONGODB, server, {native_parser: (process.env['TEST_NATIVE'] != null)});    
  db.open(function(err, db){
    test.equal(null, err);
    
    db.close(function(){
      test.equal(null, err);

      db.open(function(){
        test.equal(null, err);

        db.close();
        test.done();
      });
    });
  });  
}