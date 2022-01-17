function(done){
      var t = new Date(2012, 0, 1); // 2012/01/01
      query.getProgramListByDate('c20', t, function(err, list){
        assert.isNotNull(list);
        assert.equal(list.length, 3);
        for(var i=0; i<list.length-1; i++){
          assert.ok(list[i].start.getTime() < list[i+1].start.getTime());
        }
        done();
      });
    }