function(done) {
        RelMe.getLinks("http://localhost:4816/image.png", function(err, links) {
            should.exist(err);
            err.should.be.a("object");
            err.should.be.an.instanceOf(Error);
            done();
        });
    }