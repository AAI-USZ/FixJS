function() {
    it('returns a list of projects', function(done) {
      var req = projectReq;

      projects.list(req, db, function(errList, projectList) {
        projectList[0].title.should.equal(req.body.title);
        projectList[0].author.should.equal(req.session.email);

        req = otherProjectReq;
        projectList[1].title.should.equal(req.body.title);
        projectList[1].author.should.equal(req.session.email);
        done();
      });
    });
  }