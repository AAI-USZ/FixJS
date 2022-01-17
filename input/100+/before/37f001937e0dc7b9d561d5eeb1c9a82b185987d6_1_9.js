function(done) {
    var db = start();
    var coll = 'inclusiveexclusivecomboswork_' + random();

    var schema = new Schema({
        name: { type: String }
      , age: Number
    }, { collection: coll });
    var M = db.model('InclusiveExclusiveCombosWork', schema);

    var schema1 = new Schema({
        name: { type: String, select: false }
      , age: Number
    }, { collection: coll });
    var S = db.model('InclusiveExclusiveCombosWorkWithSchemaSelectionFalse', schema1);

    var schema2 = new Schema({
        name: { type: String, select: true }
      , age: Number
    }, { collection: coll });
    var T = db.model('InclusiveExclusiveCombosWorkWithSchemaSelectionTrue', schema2);

    function useId (M, id, cb) {
      M.findOne().select('_id -name').exec(function (err, d) {
        assert.ok(err);
        assert.ok(!d);
        M.findOne().select('-_id name').exec(function (err, d) {
          // mongo special case for exclude _id + include path
          assert.ifError(err);
          assert.equal(undefined, d.id);
          assert.equal('ssd', d.name);
          assert.equal(undefined, d.age);
          M.findOne().select('-_id -name').exec(function (err, d) {
            assert.ifError(err);
            assert.equal(undefined, d.id);
            assert.equal(undefined, d.name);
            assert.equal(0, d.age);
            M.findOne().select('_id name').exec(function (err, d) {
              assert.ifError(err);
              assert.equal(id, d.id);
              assert.equal('ssd', d.name);
              assert.equal(undefined, d.age);
              cb();
            });
          });
        });
      });
    }

    function nonId (M, id, cb) {
      M.findOne().select('age -name').exec(function (err, d) {
        assert.ok(err);
        assert.ok(!d);
        M.findOne().select('-age name').exec(function (err, d) {
          assert.ok(err);
          assert.ok(!d);
          M.findOne().select('-age -name').exec(function (err, d) {
            assert.ifError(err);
            assert.equal(id, d.id);
            assert.equal(undefined, d.name);
            assert.equal(undefined, d.age);
            M.findOne().select('age name').exec(function (err, d) {
              assert.ifError(err);
              assert.equal(id, d.id);
              assert.equal('ssd', d.name);
              assert.equal(0, d.age);
              cb();
            });
          });
        });
      });
    }

    M.create({ name: 'ssd', age: 0 }, function (err, d) {
      assert.ifError(err);
      var id = d.id;
      useId(M, id, function () {
        nonId(M, id, function () {
          useId(S, id, function () {
            nonId(S, id, function () {
              useId(T, id, function () {
                nonId(T, id, function () {
                  db.close();
                  done();
                })
              });
            })
          });
        })
      });
    });
  }