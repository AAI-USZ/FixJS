function (err, res) {

        if (err) {
          return done(err);
        }

        try {
          res.body.should.have.property('sess');
          res.body.should.have.property('userId');
          res.body.userId.should.above(0);

          Tester.setAuthUser(res.body.sess, res.body.userId);
          done();
        }
        catch (e) {
          done(e);
        }
      }