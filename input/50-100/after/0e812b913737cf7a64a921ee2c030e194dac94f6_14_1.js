function (err, res) {

        if (err) {
          return done(err);
        }

        try {
          res.body.should.have.property('error');
          res.body.error.should.equal('ERR_INVALID_USER_ID');
          res.body.should.have.property('code');
          res.body.code.should.equal(607);
          done();
        }
        catch (e) {
          done(e);
        }
      }