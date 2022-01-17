function (err, res) {

          if (err) {
            done(err);
          }

          try {
            res.body.should.have.property('userId');
            res.body.should.have.property('fistName');
            res.body.should.have.property('lastName');
            res.body.should.have.property('accountType');
            res.body.should.have.property('topPosts');
            done();
          }
          catch (e) {
            done(e);
          }
        }