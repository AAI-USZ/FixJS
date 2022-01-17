function() {
  it('should be able to create an object and read it back', function(done) {
    function create(done) {
      db.save({ name: 'Jon', age: 23 }, function(err, user) {
        assert.ok(!err, err);
        assert.ok(typeof user.id !== 'undefined');
        assert.equal(user.name, 'Jon');
        assert.equal(user.age, 23);

        done(null, user.id);
      });
    }

    function read(userId, done) {
      db.read(userId, function(err, user) {
        assert.ok(!err, err);
        assert.equal(user.name, 'Jon');
        assert.equal(user.age, 23);
        done(null, user);
      });
    }

    async.waterfall([create, read], done);
  });

  it('should take an array of objects to save/read', function(done) {
    function createObjs(done) {
      db.save([{name: 'Jon'}, {name: 'Helge'}], function(err, users) {
        assert.ok(!err, err);
        assert.equal(users[0].name, 'Jon');
        assert.equal(users[1].name, 'Helge');
        done(null, users[0], users[1]);
      });
    }

    function readObjs(user1, user2, done) {
      db.read([user1.id, user2.id], function(err, users) {
        assert.ok(!err, err);
        assert.equal(users[0].name, 'Jon');
        assert.equal(users[1].name, 'Helge');
        done();
      });
    }

    async.waterfall([createObjs, readObjs], done);
  });

  it('should handle an empty array of objects to save', function(done) {
    db.save([], done);
  });
}