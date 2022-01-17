function (err, res) {

        if (err) {
          done(err);
        }

        try {
          res.body.should.have.property('error');
          res.body.error.should.equal('ERR_EMPTY_RESULTS');
          res.body.should.have.property('code');
          res.body.code.should.equal(601);
          done();
        }
        catch (e) {
          done(e);
        }
      }