function(err){
          err.message.should.include('ENOENT, no such file');
          err.path.should.equal('foo');
          done();
        }