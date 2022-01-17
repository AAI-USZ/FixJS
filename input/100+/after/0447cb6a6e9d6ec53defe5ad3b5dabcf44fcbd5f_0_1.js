function() {
    var err = null;
    var r = new rivet.Rivet();
    r.task('foo', function() {
      throw new Error('something is thrown')
    });
    
    before(function(done) {
      r.run('foo', function(e) {
        //if (err) return done(err);
        err = e;
        return done();
      });
    })
    
    describe('result', function() {
      it('should callback with error', function() {
        err.should.be.an.instanceOf(Error);
        err.message.should.be.equal('something is thrown');
      })
    })
  }