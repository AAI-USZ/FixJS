function (err, result) {
        expect(err).to.eql({"foo": "must not be bar"});
        done();
      }