function (err, res) {

          if (err) {
            return done(err);
          }

          try {
            res.body.should.have.property('removedCount');
            done();
          }
          catch (e) {
            done(e);
          }
        }