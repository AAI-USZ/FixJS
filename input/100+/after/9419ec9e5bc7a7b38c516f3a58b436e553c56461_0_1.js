function(done) {
    function createObjs(done) {
      db.save([{name: 'Jon', age: 23}, 
               {name: 'Neil', age: 60},
               {name: 'Katie', age: 29}],
              function(err, users) {
                done(null, users[0], users.slice(1));
              });
    }
    
    function linkObjs(user1, users, done) {
      db.relate(user1, 'knows', users, function(err, links) {
        done(null, user1);
      });
    }
    
    function query(user, done) {
      var cypher = "start x = node(" + user.id + ") ";
      cypher    += "match x -[r]-> n ";
      cypher    += "return x, collect(n)";
      db.query(cypher, function(err, result) {
        assert.ok(!err);
        delete result[0]['x'].id;
        delete result[0]['collect(n)'][0].id;
        delete result[0]['collect(n)'][1].id;
        assert.deepEqual([{
          'x': { name: 'Jon' },
          'collect(n)': [{ name: 'Neil' },
                         { name: 'Katie' }]
        }], result);
        done();
      });
    }
  
    async.waterfall([createObjs, linkObjs, query], done);
  }