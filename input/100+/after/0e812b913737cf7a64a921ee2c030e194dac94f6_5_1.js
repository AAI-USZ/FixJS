function (err, res) {

        if (err) {
          return done(err);
        }

        try {
          res.body.should.have.property('count');
          res.body.should.have.property('pages');
          res.body.should.have.property('currentPage');
          res.body.should.have.property('isNextPage');
          res.body.should.have.property('isPrevPage');
          res.body.should.have.property('result');
          done();
        }
        catch (e) {
          done(e);
        }
      }