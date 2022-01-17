function (err, result) {
        expect(err).to.eql({errors: {"foo": "must not be bar"}});
        done();
      }