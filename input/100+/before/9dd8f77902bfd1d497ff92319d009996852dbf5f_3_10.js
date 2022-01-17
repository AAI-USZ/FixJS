function () {
    var db = start()
      , Mod = db.model('Mod', 'mods_' + random());

    Mod.create({num: 1}, {num: 2, str: 'two'}, function (err, one, two) {
      should.strictEqual(err, null);

      var pending = 3;
      test1();
      test2();
      test3();

      function test1 () {
        Mod.find({$or: [{num: 1}, {num: 2}]}, function (err, found) {
          done();
          should.strictEqual(err, null);
          found.should.have.length(2);
          found[0]._id.should.eql(one._id);
          found[1]._id.should.eql(two._id);
        });
      }

      function test2 () {
        Mod.find({ $or: [{ str: 'two'}, {str:'three'}] }, function (err, found) {
          if (err) console.error(err);
          done();
          should.strictEqual(err, null);
          found.should.have.length(1);
          found[0]._id.should.eql(two._id);
        });
      }

      function test3 () {
        Mod.find({$or: [{num: 1}]}).$or([{ str: 'two' }]).run(function (err, found) {
          if (err) console.error(err);
          done();
          should.strictEqual(err, null);
          found.should.have.length(2);
          found[0]._id.should.eql(one._id);
          found[1]._id.should.eql(two._id);
        });
      }

      function done () {
        if (--pending) return;
        db.close();
      }
    });
  }