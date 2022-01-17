function (err, res) {

        if (err) {
          done(err);
        }

        try {
          res.body.should.have.property('error');
          res.body.error.should.equal('ERR_UNAUTHORIZED');
          res.body.should.have.property('code');
          res.body.code.should.equal(401);
          done();
        }
        catch (e) {
          done(e);
        }
      }