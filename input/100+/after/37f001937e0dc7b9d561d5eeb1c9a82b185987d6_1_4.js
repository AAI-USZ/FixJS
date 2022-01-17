function (done) {
    var db =start()

    var schema = new Schema({
        thin: Boolean
      , name: { type: String, select: true }
      , docs: [new Schema({ bool: Boolean, name: { type: String, select: true }})]
    });

    var S = db.model('IncludingBySchemaType', schema);
    S.create({ thin: true, name: 'the included', docs:[{bool:true, name: 'test'}] },function (err, s) {
      assert.ifError(err);
      assert.equal(s.name, 'the included');
      assert.equal(s.docs[0].name, 'test');

      var pending = 2;
      function cb (err, s) {
        if (!--pending) {
          db.close();
          done();
        }
        if (Array.isArray(s)) s = s[0];
        assert.strictEqual(null, err);
        assert.strictEqual(true, s.isSelected('name'));
        assert.strictEqual(true, s.isSelected('docs.name'));
        assert.equal(s.name, 'the included');
      }

      S.findById(s).select('-thin -docs.bool').exec(cb);
      S.find({ _id: s._id }).select('thin docs.bool').exec(cb);
    });
  }