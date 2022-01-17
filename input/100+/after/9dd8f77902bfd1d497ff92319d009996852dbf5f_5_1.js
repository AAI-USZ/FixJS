function () {
    var db = start()
      , P = db.model('PersonForStream', collection)
      , finished = 0
      , i = 0

    var stream = P.where('name').exists().limit(10).select('_id').stream();

    should.strictEqual(null, stream._destroyed);
    stream.readable.should.be.true;

    stream.on('data', function (doc) {
      should.strictEqual(undefined, doc.name);
      if (++i === 5) {
        stream.destroy();
        stream.readable.should.be.false;
      }
    });

    stream.on('close', done);
    stream.on('error', done);

    function done (err) {
      ++finished;
      setTimeout(function () {
        db.close();
        should.strictEqual(undefined, err);
        i.should.equal(5);
        finished.should.equal(1);
        stream._destroyed.should.equal(true);
        stream.readable.should.be.false;
        stream._cursor.isClosed().should.be.true;
      }, 150)
    }
  }