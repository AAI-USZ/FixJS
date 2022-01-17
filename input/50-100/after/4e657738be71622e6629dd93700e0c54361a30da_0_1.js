function(err, links) {
            should.not.exist(err);
            should.exist(links);
            links.should.be.a("object");
            links.should.be.an.instanceOf(Array);
            links.should.have.length(0);
            done();
        }