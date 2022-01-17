function(done){
      var t = new Date(2012, 0, 1); // 2012/01/01
      query.getProgramListByDate('c20', t, function(err, list){
        assert.isNotNull(list);
        assert.equal(list.length, 2);
        done();
      });
    }