function (err, res) {

        if (err) {
          return done(err);
        }

        try {
          res.body.should.have.property('sess');
          res.body.should.have.property('userId');
          res.body.userId.should.equal(0);

          Tester.setSession(res.body.sess);
          done();
        }
        catch (e) {
          done(e);
        }
      }