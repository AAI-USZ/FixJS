function(err, links) {
            should.exist(err);
            err.should.be.a("object");
            err.should.be.an.instanceOf(RelMe.TypeError);
            err.should.have.property("type");
            done();
        }