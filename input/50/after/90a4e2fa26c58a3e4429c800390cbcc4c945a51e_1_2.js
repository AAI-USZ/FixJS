function (done) {
    ghost.getTitle(function (title) {
      title.should.be.equal('GitHub · Social Coding');
    })
    .done(done);
  }