function(err,data){
        if(err) throw err;
        Object.keys(watcher.fds).length.should.eql(1);
        
        done();
      }