function() {
    var req = projectReq;

    it('deletes a project', function(done) {
      projects.remove(req, db, 1, function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('accepts an empty callback', function(done) {
      projects.remove(req, db, 2);

      // wait 10ms for db transaction to complete
      setTimeout(function() {
        projects.list(req, db, function(err, projectList) {
          projectList.should.eql([]);
          done();
        });
      }, 10);
    });

    it('deletes a screen associated with a project', function(done) {
      var req = projectReq;

      projects.add(req, db, function(err, project) {
        req = screenReq;

        screens.add(req, db, function(err, screen) {
          req = projectReq;

          projects.remove(req, db, 1, function(err) {
            should.not.exist(err);
            screens.list(req, db, function(err, screenList) {
              screenList.should.eql([]);
              done();
            });
          });
        });
      });
    });
  }