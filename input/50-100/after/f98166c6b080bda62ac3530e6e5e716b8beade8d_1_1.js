function () {

    it('can get a user', function (done) {
      fbagent
        .get('/jakeluer')
        .end(function (err, res) {
          should.not.exist(err);
          res.should.have.property('username', 'jakeluer');
          done();
        });
    });

  }