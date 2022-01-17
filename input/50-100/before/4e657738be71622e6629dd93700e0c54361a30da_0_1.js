function(err, links) {
            should.not.exist(err);
            should.exist(links);
            links.should.be.a("array");
            links.should.have.length(0);
            done();
        }