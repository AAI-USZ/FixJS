function(err,data){
        if(err) throw err;
        assert.equal(Object.keys(watcher.fds).length,1,'should only have one fd if fd1 timed out');
        
        done();
      }