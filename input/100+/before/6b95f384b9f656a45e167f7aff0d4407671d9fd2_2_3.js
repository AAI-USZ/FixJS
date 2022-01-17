function(done){
      var db = mongoose.createConnection('mongodb://localhost/fake', done);
      assert.equal('object', typeof db.options);
      assert.equal('object', typeof db.options.server);
      assert.equal(true, db.options.server.auto_reconnect);
      assert.equal('object', typeof db.options.db);
      assert.equal(false, db.options.db.forceServerObjectId);
      assert.equal(undefined, db.user);
      assert.equal('fake', db.name);
      assert.equal('localhost', db.host);
      assert.equal(27017, db.port);
      db.close();
    }