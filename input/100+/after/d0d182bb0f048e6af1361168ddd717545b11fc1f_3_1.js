function() {
    describe('.get(fn)', function() {
      it('should return an empty array', function(done) {
        dpd.empty.get(function(result) {
          expect(result).to.eql([]);
          done();
        })        
      });
    });
  }