function(err, data) {
        should.not.exist(err);

        data.should.include('def');
        done();
      }