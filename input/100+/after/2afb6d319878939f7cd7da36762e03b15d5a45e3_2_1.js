function(done) {
    asyncEval("var x = undefined; \n x.toString();", function(err) {
      expect(err).to.exist;
      expect(err instanceof TypeError).to.equal(true);
      expect(err.message).to.equal("Cannot call method 'toString' of undefined");
      done();
    });
  }