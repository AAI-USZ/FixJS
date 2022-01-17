function(error, email) {
        should.not.exist(error);
        email.should.equal(response.email);
        done();
      }