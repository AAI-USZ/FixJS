function(done){
      var db = mongoose.createConnection('mongodb://aaron:psw@localhost:27000/fake', { server: { auto_reconnect: true }}, function () {
        done();
      });
      assert.equal('object', typeof db.options);
      assert.equal('object', typeof db.options.server);
      assert.equal(true, db.options.server.auto_reconnect);
      assert.equal('object', typeof db.options.db);
      assert.equal(false, db.options.db.forceServerObjectId);
      db.close();
    }