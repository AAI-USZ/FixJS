function (done) {
    var db =start()

    var selected = new Schema({
        thin: Boolean
      , name: { type: String, select: true }
    });
    var excluded = new Schema({
        thin: Boolean
      , name: { type: String, select: false }
    });

    var S = db.model('OverriddingSelectedBySchemaType', selected);
    var E = db.model('OverriddingExcludedBySchemaType', excluded);

    var pending = 4;

    S.create({ thin: true, name: 'the included' },function (err, s) {
      assert.ifError(err);
      assert.equal(s.name, 'the included');

      S.find({ _id: s._id }).select('thin name').exec(function (err, s) {
        if (!--pending) {
          db.close();
          done();
        }
        s = s[0];
        assert.ifError(err);
        assert.strictEqual(true, s.isSelected('name'));
        assert.strictEqual(true, s.isSelected('thin'));
        assert.equal(s.name, 'the included');
        assert.ok(s.thin);
      });

      S.findById(s).select({'name':0}).exec(function (err, s) {
        if (!--pending) {
          db.close();
          done();
        }
        assert.strictEqual(null, err);
        assert.equal(false, s.isSelected('name'))
        assert.equal(true, s.isSelected('thin'))
        assert.strictEqual(undefined, s.name);
        assert.equal(true, s.thin);
      });
    });

    E.create({ thin: true, name: 'the excluded' },function (err, e) {
      assert.ifError(err);
      assert.equal(e.name, 'the excluded');

      E.find({ _id: e._id }).select('thin name').exec(function (err, e) {
        if (!--pending) {
          db.close();
          done();
        }
        e = e[0];
        assert.strictEqual(null, err);
        assert.equal(true, e.isSelected('name'));
        assert.equal(true, e.isSelected('thin'));
        assert.equal(e.name, 'the excluded');
        assert.ok(e.thin);
      });

      E.findById(e).select({'name':0}).exec(function (err, e) {
        if (!--pending) {
          db.close();
          done();
        }
        assert.strictEqual(null, err);
        assert.equal(e.isSelected('name'),false)
        assert.equal(e.isSelected('thin'), true);
        assert.strictEqual(undefined, e.name);
        assert.strictEqual(true, e.thin);
      });
    });
  }