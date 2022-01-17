function(err, links) {
            should.not.exist(err);
            should.exist(links);
            links.should.be.a("object");
            links.should.be.an.instanceOf(Array);
            links.should.have.length(3);
            links.should.include("http://geo.example.com/user2");
            links.should.include("http://user2.example.net/blog");
            links.should.include("http://video.example.com/user2");
            done();
        }