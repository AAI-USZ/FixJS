function () {
    var db = start()
      , B = db.model('BlogPost', collection)
      , pending = 2;

    var b = new B;

    b.numbers.push(3);
    b.save(function (err) {
      should.strictEqual(null, err);
      --pending || find();
    });

    b.numbers.push(3);
    b.save(function (err) {
      should.strictEqual(null, err);
      --pending || find();
    });

    function find () {
      B.findById(b, function (err, b) {
        db.close();
        should.strictEqual(null, err);
        b.numbers.length.should.equal(2);
      });
    }
  }