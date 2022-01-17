function(done) {
        RelMe.getLinks("http://localhost:4816/missing", function(err, links) {
            should.exist(err);
            err.should.be.a("object");
            err.should.be.an.instanceOf(RelMe.HTTPError);
            err.should.have.property("code");
            err.code.should.equal(404);
            done();
        });
    }