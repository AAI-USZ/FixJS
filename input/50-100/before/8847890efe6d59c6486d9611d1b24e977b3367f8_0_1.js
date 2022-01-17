function() {
    it("stubs modules in given context", function() {
      require('./stubber').stubbed.should.equal('stubbed module');
    });

    it("stubs modules in child context", function() {
      require('./stubber').child.stubbed.should.equal('stubbed module');
    });

    it("doesn't stub in parent context", function() {
      (function() {
        require('stubbed');
      }).should.Throw("Cannot find module 'stubbed'");
    });
  }