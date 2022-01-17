function(done){
      var t = new Date(2038, 0, 1); // 2012/01/01
      query.getTimerListByDate(t, function(err, list){
        assert.isNotNull(list);
        assert.equal(list.length, 1);
        for(var i=0; i<list.length-1; i++){
          assert.ok(list[i].start.getTime() < list[i+1].start.getTime());
        }
        done();
      });
    }