function () {
    var db = start()

    var schema = new Schema({
        name: { type: String, unique: true }
      , em: [new Schema({ x: Number })]
    }, { collection: 'testisnewonfail_'+random() });
    var A = db.model('isNewOnFail', schema);
    var a = new A({ name: 'i am new', em: [{ x: 1 }] });
    a.save(function (err) {
      should.strictEqual(null, err);
      assert.equal(a.isNew, false);
      assert.equal(a.em[0].isNew, false);
      var b = new A({ name: 'i am new', em: [{x:2}] });
      b.save(function (err) {
        db.close();
        assert(err);
        assert.equal(b.isNew, true);
        assert.equal(b.em[0].isNew, true);
      });
    });
  }