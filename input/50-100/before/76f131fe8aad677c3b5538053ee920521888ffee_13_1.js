function (err, res) {

        if (err) {
          done(err);
        }

        try {
          res.body.should.have.property('postId');
          res.body.should.have.property('views');
          res.body.views.should.above(Tester.getPostViewsCount());

          done();
        }
        catch (e) {
          done(e);
        }
      }