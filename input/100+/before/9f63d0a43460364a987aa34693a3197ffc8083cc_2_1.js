function(beforeExit){
  
  var changesObservedThroughDefaultListener = 0,
      watcher = watchfd.watch(logFile,{timeout:1000,timeoutInterval:200},function(cur,prev){
        /*dont need to watch change here*/
        changesObservedThroughDefaultListener++;
      }),
      expect = new ExpectEvent(watcher);

      
  watcher.on('error',function(err){
    throw err;
  });
  
  //
  // enforce some max execution time for watcher test
  //
  
  expect.expect('close',function(err,data){
    if(err) {
      watcher.close();
      fs.unlink();
      throw err;
    }
  },20000);
  
  //cleanup
  var cleanup = function(){
    fs.unlink(logFile);
    if(!changesObservedThroughDefaultListener){
      ("this test should have triggered the default change handler numerous times").should.eql(true);
    }
  };
  
  beforeExit(cleanup);
  
  // file descriptors for unlinked events tests
  var fd1 = null;
      fd2 = null;
  
  var q = {
    //
    "trigger open. expect that it is fired within six seconds":function(){
      expect.expect('open',function(err,stat){
        if(err) throw err;
        done();
      },6000);
      
      fs.open(logFile,'a+',function(err,fd){
        (!err).should.eql(true);
        
        fd1 = fd;
        
        var buf = new Buffer('party rockin');
        
        // watchFile does not seem to hit imediately for regular empty files.
        fs.write(fd1,buf,0,buf.length,null,function(err,bytesWritten){
          (!err).should.eql(true);
        });
      });
    },
    //
    "trigger change expect that it is fired within one second":function(){
      expect.expect('change',function(err,data){
        if(err) throw err;
        //must have file descriptor with change events
        (!!data[3].fd).should.eql(true);
        done();
      },1000);
      
      var buf = new Buffer('party floppin');
      
      fs.write(fd1,buf,0,buf.length,null,function(err,bytesWritten){
        (!err).should.eql(true);
      });
    },
    //
    "unlink and wait for unlink":function(){
      expect.expect('unlink',function(err,data){
        if(err) throw err;
        done();
      },1000);   
      
      fs.unlink(logFile,function(err){
        (!err).should.eql(true);
      });
    },
    //
    "create again wait for open":function(){
      expect.expect('open',function(err,data){
        if(err) throw err;
        done();
      },10000);
      
      fs.open(logFile,'w+',function(err,fd){
        (!err).should.eql(true);
        fd2 = fd;
        
        var buf = new Buffer('new party');
        
        fs.write(fd2,buf,0,buf.length,null,function(err,bytesWritten){
          
          (!err).should.eql(true);
        });
      });
    },
    //
    "write data to unlinked fd and wait for change":function(){
      expect.expect('change',function(err,data){
        if(err) throw err;
        done();
      },1000);
      
      var buf = new Buffer('party unlinked');
      
      fs.write(fd1,buf,0,buf.length,null,function(err,bytesWritten){
        (!err).should.eql(true);
      });
    },
    //
    "wait for timeout on fd1":function(){
      
      expect.expect('timeout',function(err,data){
        if(err) throw err;
        Object.keys(watcher.fds).length.should.eql(1);
        
        done();
      },2000);
    }
  },
  lastStart = Date.now(),
  done = function(){
    var keys = Object.keys(q),
        testKey = keys.shift(),
        test = q[testKey];
    
    if(test) {
      delete q[testKey];
      
      var elapsed = Date.now()-lastStart;
      console.log("\telapsed: ",elapsed,'ms');
      console.log('starting test : ',testKey);
      lastStart = Date.now();
      test();
    } else complete();
  },
  complete = function(){
    watcher.close();
    cleanup();
  };
  done();
  
}