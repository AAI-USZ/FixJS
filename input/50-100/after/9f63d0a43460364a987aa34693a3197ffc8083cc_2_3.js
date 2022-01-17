function(err,fd){
        assert.ifError(err,'error opening test file for writing');
        fd2 = fd;
        
        var buf = new Buffer('new party');
        
        fs.write(fd2,buf,0,buf.length,null,function(err,bytesWritten){
          assert.ifError(err,'should have written byte to the test file');
        });
      }