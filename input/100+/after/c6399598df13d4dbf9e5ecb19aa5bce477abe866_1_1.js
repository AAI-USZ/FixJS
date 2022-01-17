function () {
    var db =start()

    var schema = new Schema({
        nested: {
            num: Number
        }
    });

    var M = db.model('NestedObjectWithMongooseNumber', schema);
    var m = new M;
    m.nested = null;
    m.save(function (err) {
      should.strictEqual(null, err);

      M.findById(m, function (err, m) {
        should.strictEqual(null, err);
        m.nested.num = 5;
        m.save(function (err) {
          db.close();
          should.strictEqual(null, err);
        });
      });
    });
  }