function(err,data){
        if(err) throw err;
        //must have file descriptor with change events
        assert.ok(data[3].fd,'must have fd with change events');

        done();
      }