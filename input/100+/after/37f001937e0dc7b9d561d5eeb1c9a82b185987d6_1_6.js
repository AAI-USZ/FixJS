function (done) {
    var db =start()

    var selected = new Schema({
        thin: Boolean
      , name: { type: String, select: true }
      , docs: [new Schema({ name: { type: String, select: true }, bool: Boolean })]
    });
    var excluded = new Schema({
        thin: Boolean
      , name: { type: String, select: false }
      , docs: [new Schema({ name: { type: String, select: false }, bool: Boolean})]
    });

    var S = db.model('OverriddingSelectedBySchemaType', selected);
    var E = db.model('OverriddingExcludedBySchemaType', excluded);

    var pending = 4;

    S.create({ thin: true, name: 'the included', docs: [{name:'test',bool: true}] },function (err, s) {
      assert.ifError(err);
      assert.equal(s.name, 'the included');
      assert.equal(s.docs[0].name, 'test');

      S.find({ _id: s._id }).select('thin name docs.bool docs.name').exec(function (err, s) {
        if (!--pending) {
          db.close();
          done();
        }
        s = s[0];
        assert.ifError(err);
        assert.strictEqual(true, s.isSelected('name'));
        assert.strictEqual(true, s.isSelected('thin'));
        assert.strictEqual(true, s.isSelected('docs.name'));
        assert.strictEqual(true, s.isSelected('docs.bool'));
        assert.equal(s.name, 'the included');
        assert.equal(s.docs[0].name, 'test');
        assert.ok(s.thin);
        assert.ok(s.docs[0].bool);
      });

      S.findById(s).select('-name -docs.name').exec(function (err, s) {
        if (!--pending) {
          db.close();
          done();
        }
        assert.strictEqual(null, err);
        assert.equal(false, s.isSelected('name'))
        assert.equal(true, s.isSelected('thin'))
        assert.equal(false, s.isSelected('docs.name'))
        assert.equal(true, s.isSelected('docs.bool'))
        assert.strictEqual(undefined, s.name);
        assert.strictEqual(undefined, s.docs[0].name);
        assert.equal(true, s.thin);
        assert.equal(true, s.docs[0].bool);
      });
    });

    E.create({ thin: true, name: 'the excluded',docs:[{name:'test',bool:true}] },function (err, e) {
      assert.ifError(err);
      assert.equal(e.name, 'the excluded');
      assert.equal(e.docs[0].name, 'test');

      E.find({ _id: e._id }).select('thin name docs.name docs.bool').exec(function (err, e) {
        if (!--pending) {
          db.close();
          done();
        }
        e = e[0];
        assert.strictEqual(null, err);
        assert.equal(true, e.isSelected('name'));
        assert.equal(true, e.isSelected('thin'));
        assert.equal(true, e.isSelected('docs.name'));
        assert.equal(true, e.isSelected('docs.bool'));
        assert.equal(e.name, 'the excluded');
        assert.equal(e.docs[0].name, 'test');
        assert.ok(e.thin);
        assert.ok(e.docs[0].bool);
      });

      E.findById(e).select('-name -docs.name').exec(function (err, e) {
        if (!--pending) {
          db.close();
          done();
        }
        assert.strictEqual(null, err);
        assert.equal(e.isSelected('name'),false)
        assert.equal(e.isSelected('thin'), true);
        assert.equal(e.isSelected('docs.name'),false)
        assert.equal(e.isSelected('docs.bool'), true);
        assert.strictEqual(undefined, e.name);
        assert.strictEqual(undefined, e.docs[0].name);
        assert.strictEqual(true, e.thin);
        assert.strictEqual(true, e.docs[0].bool);
      });
    });
  }