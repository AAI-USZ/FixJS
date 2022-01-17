function(){
    var db = start()
      , User = db.model('User', 'users_' + random())
      , Pet = db.model('Pet', 'pets' + random());

    var tj = new User({ name: 'tj' })
      , tobi = new Pet({ name: 'tobi' })
      , loki = new Pet({ name: 'loki' })
      , jane = new Pet({ name: 'jane' })
      , pets = [];

    tj.pets.push(tobi);
    tj.pets.push(loki);
    tj.pets.push(jane);

    var pending = 3;

    ;[tobi, loki, jane].forEach(function(pet){
      pet.save(function(){
        --pending || done();
      });
    });

    function done() {
      Pet.find({}, function(err, pets){
        tj.save(function(err){
          User.findOne({ name: 'tj' }, function(err, user){
            db.close();
            should.equal(null, err, 'error in callback');
            user.pets.should.have.length(3);
            user.pets.indexOf(tobi.id).should.equal(0);
            user.pets.indexOf(loki.id).should.equal(1);
            user.pets.indexOf(jane.id).should.equal(2);
            user.pets.indexOf(tobi._id).should.equal(0);
            user.pets.indexOf(loki._id).should.equal(1);
            user.pets.indexOf(jane._id).should.equal(2);
          });
        });
      });
    }
  }