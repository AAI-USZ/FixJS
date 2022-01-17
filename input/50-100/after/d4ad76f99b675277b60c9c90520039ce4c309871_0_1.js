function(done) {
        RelMe.should.have.property("ProtocolError");
        RelMe.ProtocolError.should.be.a("function");
        done();
    }