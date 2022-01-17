function () {
    var db = start()
    var D = db.model('D', new Schema({dt: String}), collection);

    D.create({ dt: '2011-03-30' }, done);
    D.create({ dt: '2011-03-31' }, done);
    D.create({ dt: '2011-04-01' }, done);
    D.create({ dt: '2011-04-02' }, done);

    var pending = 3;
    function done (err) {
      if (err) db.close();
      should.strictEqual(err, null);

      if (--pending) return;

      pending = 2;

      D.find({ 'dt': { $gte: '2011-03-30', $lte: '2011-04-01' }}).sort('dt', 1).exec(function (err, docs) {
        if (--pending) db.close();
        should.strictEqual(err, null);
        docs.length.should.eql(3);
        docs[0].dt.should.eql('2011-03-30');
        docs[1].dt.should.eql('2011-03-31');
        docs[2].dt.should.eql('2011-04-01');
        docs.some(function (d) { return '2011-04-02' === d.dt }).should.be.false;
      });

      D.find({ 'dt': { $gt: '2011-03-30', $lt: '2011-04-02' }}).sort('dt', 1).exec(function (err, docs) {
        if (--pending) db.close();
        should.strictEqual(err, null);
        docs.length.should.eql(2);
        docs[0].dt.should.eql('2011-03-31');
        docs[1].dt.should.eql('2011-04-01');
        docs.some(function (d) { return '2011-03-30' === d.dt }).should.be.false;
        docs.some(function (d) { return '2011-04-02' === d.dt }).should.be.false;
      });
    }
  }