function (err, res) {

        if (err) {
          return done(err);
        }

        try {
          res.body.should.have.property('postId');
          res.body.should.have.property('rate');
          res.body.rate.should.equal(Tester.getRatePostValue() + 1);

          Tester.setPostToRate(res.body.postId, res.body.rate, true); //update current value
          done();
        }
        catch (e) {
          done(e);
        }
      }