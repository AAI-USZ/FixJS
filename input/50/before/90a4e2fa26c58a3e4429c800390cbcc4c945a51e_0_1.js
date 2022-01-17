function (done) {
    var count = 0;
    ghost.done(function () {
      count++;
    });
    count.should.be.equal(1);
    done();
  }