function(err,fd){
        (!err).should.eql(true);
        
        fd1 = fd;
        
        var buf = new Buffer('party rockin');
        
        // watchFile does not seem to hit imediately for regular empty files.
        fs.write(fd1,buf,0,buf.length,null,function(err,bytesWritten){
          (!err).should.eql(true);
        });
      }