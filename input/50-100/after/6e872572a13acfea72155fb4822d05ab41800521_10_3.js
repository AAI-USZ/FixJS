function(done) {
        components.remove(req, db, 2);

        // wait 10ms for db transaction to complete
        setTimeout(function() {
          components.list(req, db, function(error, componentList) {
            componentList.should.eql([]);
            done();
          });
        }, 10);
      }