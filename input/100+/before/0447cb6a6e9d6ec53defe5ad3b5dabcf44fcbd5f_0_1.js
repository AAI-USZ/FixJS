function() {
    var err = null;
    var r = new rivet.Rivet();
    r.task('foo', function() {
      this.scratch['test'] = 'foo';
    });
    
    before(function(done) {
      r.run('xfoo', function(e) {
        //if (err) return done(err);
        err = e;
        return done();
      });
    })
    
    describe('result', function() {
      it('should callback with error', function() {
        err.should.be.an.instanceOf(Error);
        err.message.should.be.equal('No task named "xfoo"');
      })
    })
  }