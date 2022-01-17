function(err){
          err.message.should.include('ENOENT');
          err.path.should.equal('foo');
          done();
        }