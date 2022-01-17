function(done) {
        RelMe.should.have.property("TypeError");
        RelMe.TypeError.should.be.a("function");
        done();
    }