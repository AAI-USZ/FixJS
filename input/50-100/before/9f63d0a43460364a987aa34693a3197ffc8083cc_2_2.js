function(){
      expect.expect('unlink',function(err,data){
        if(err) throw err;
        done();
      },1000);   
      
      fs.unlink(logFile,function(err){
        (!err).should.eql(true);
      });
    }