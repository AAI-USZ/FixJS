function(done) {
    function createObjs(done) {
      db.save([{name: 'Jon'}, {name: 'Helge'}], function(err, users) {
        done(null, users[0], users[1]);
      });
    }

    function linkObjs(user1, user2, done) {
      db.rel.create(user1, 'coworker', user2, function(err, link) {
        done(null, link, user1, user2);
      });
    }

    function delLink(link, user1, user2, done) {
      var linkId = link.id;
      db.rel.read(link.id, function(err, link) {
        assert.equal(link.start, user1.id);
        assert.equal(link.end, user2.id);
        db.rel.delete(link.id, function(err) {
          assert.ok(!err);
          db.rel.read(link.id, function(err, link) {
            assert.ok(!!err);
            assert.ok(!link);
          })
        })
        done(null);
      });
    }

    async.waterfall([createObjs, linkObjs, delLink], done);
  }