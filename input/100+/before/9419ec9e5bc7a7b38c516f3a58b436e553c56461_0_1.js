function(done) {
    function createObjs(done) {
      db.save([{name: 'Jon', age: 23}, 
               {name: 'Neil', age: 60},
               {name: 'Katie', age: 29}], function(err, users) {
        done(null, users[0], users.slice(1));
      });
    }

    function linkObjs(user1, users, done) {
      db.relate(user1, 'knows', users, function(err, links) {
        done(null, user1, users);
      });
    }

    function query(user, users, done) {
      var cypher = "start x = node(" + user.id + ") ";
      cypher    += "match x -[r]-> n ";
      cypher    += "return n ";
      cypher    += "order by n.name";
      db.query(cypher, function(err, result) {
        assert.ok(!err);
        assert.deepEqual([ users[1], users[0] ], result);
        done();
      });
    }
  
    async.waterfall([createObjs, linkObjs, query], done);
  }