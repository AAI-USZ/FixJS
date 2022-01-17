function(err,data){
        if(err) throw err;
        //must have file descriptor with change events
        (!!data[3].fd).should.eql(true);
        done();
      }