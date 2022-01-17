function() {
      it('should properly return an error', function(done) {
        dpd.todos.post({title: "notvalid"}, function(result, err) {
          expect(err).to.exist;
          expect(err.errors).to.exist;
          expect(err.errors.title).to.equal("Title must not be notvalid");
          done();
        });
      });
    }