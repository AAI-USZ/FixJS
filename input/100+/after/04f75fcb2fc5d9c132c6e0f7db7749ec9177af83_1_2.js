function (done) {
    var db =start()

    var schema = new Schema({
        thin: Boolean
      , name: { type: String, select: false}
      , docs: [new Schema({ bool: Boolean, name: { type: String, select: false }})]
    });

    var S = db.model('ExcludingBySchemaType', schema);
    S.create({ thin: true, name: 'the excluded', docs:[{bool:true, name: 'test'}] },function (err, s) {
      assert.ifError(err);
      assert.equal(s.name, 'the excluded');
      assert.equal(s.docs[0].name, 'test');

      var pending = 3;
      function cb (err, s) {
        if (!--pending) {
          db.close();
          done();
        }

        if (Array.isArray(s)) s = s[0];
        assert.strictEqual(null, err);
        assert.equal(false, s.isSelected('name'));
        assert.equal(false, s.isSelected('docs.name'));
        assert.strictEqual(undefined, s.name);
      }

      S.findById(s).select({thin:0, 'docs.bool':0}).exec(cb);
      S.find({ _id: s._id }).select('thin docs.bool').exec(cb);
      S.findById(s, cb);
    });
  }