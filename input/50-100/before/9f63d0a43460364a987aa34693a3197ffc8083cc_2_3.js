function(err,fd){
        (!err).should.eql(true);
        fd2 = fd;
        
        var buf = new Buffer('new party');
        
        fs.write(fd2,buf,0,buf.length,null,function(err,bytesWritten){
          
          (!err).should.eql(true);
        });
      }