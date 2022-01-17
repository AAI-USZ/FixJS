function(){
    it('execute with user:pwd connection strings', function(done){
      var db = mongoose.createConnection('mongodb://aaron:psw@localhost:27000/fake', { server: { auto_reconnect: true }}, function () {
        done();
      });
      assert.equal('object', typeof db.options);
      assert.equal('object', typeof db.options.server);
      assert.equal(true, db.options.server.auto_reconnect);
      assert.equal('object', typeof db.options.db);
      assert.equal(false, db.options.db.forceServerObjectId);
      db.close();
    });
    it('execute without user:pwd connection strings', function(done){
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
    });
    it('should return an error if malformed uri passed', function(done){
      var db = mongoose.createConnection('mongodb:///fake', function (err) {
        assert.equal('Missing connection hostname.', err.message);
        done();
      });
      assert.equal('object', typeof db.options);
      assert.equal('object', typeof db.options.server);
      assert.equal(true, db.options.server.auto_reconnect);
      assert.equal('object', typeof db.options.db);
      assert.equal(false, db.options.db.forceServerObjectId);
      assert.equal(undefined, db.name);
      assert.equal(undefined, db.host);
      assert.equal(undefined, db.port);
      db.close();
    })
    it('should return an error if db was not specified', function(done){
      var db = mongoose.createConnection('mongodb://localhost', function (err) {
        assert.equal('Missing connection database.', err.message);
        done();
      });
      assert.equal('object', typeof db.options);
      assert.equal('object', typeof db.options.server);
      assert.equal(true, db.options.server.auto_reconnect);
      assert.equal('object', typeof db.options.db);
      assert.equal(false, db.options.db.forceServerObjectId);
      assert.equal(undefined, db.name);
      assert.equal(undefined, db.host);
      assert.equal(undefined, db.port);
      db.close();
    })
    it('should fire when individual args are passed', function(done){
      var db = mongoose.createConnection('127.0.0.1', 'faker', 28000, { server: { auto_reconnect: false }},function(){
        done();
      });
      assert.equal('object', typeof db.options);
      assert.equal('object', typeof db.options.server);
      assert.equal(false, db.options.server.auto_reconnect);
      assert.equal('object', typeof db.options.db);
      assert.equal(false, db.options.db.forceServerObjectId);
      assert.equal('faker', db.name);
      assert.equal('127.0.0.1', db.host);
      assert.equal(28000, db.port);
      db.close();
    });
    it('should fire when no options are passed', function(done){
      var db = mongoose.createConnection('127.0.0.1', 'faker', 28000, function(){
        done();
      });
      assert.equal('object', typeof db.options);
      assert.equal('object', typeof db.options.server);
      assert.equal(true, db.options.server.auto_reconnect);
      assert.equal('object', typeof db.options.db);
      assert.equal(false, db.options.db.forceServerObjectId);
      assert.equal('faker', db.name);
      assert.equal('127.0.0.1', db.host);
      assert.equal(28000, db.port);
      db.close();
    })
    it('should fire when default port utilized', function(done){
      var db = mongoose.createConnection('127.0.0.1', 'faker', done);
      assert.equal('object', typeof db.options);
      assert.equal('object', typeof db.options.server);
      assert.equal(true, db.options.server.auto_reconnect);
      assert.equal('object', typeof db.options.db);
      assert.equal(false, db.options.db.forceServerObjectId);
      assert.equal('faker', db.name);
      assert.equal('127.0.0.1', db.host);
      assert.equal(27017, db.port);
      db.close();
    })
  }