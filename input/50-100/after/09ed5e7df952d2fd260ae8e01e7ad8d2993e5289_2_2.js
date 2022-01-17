function(done){
      var t = new Date(2012, 0, 1); // 2012/01/01
      // This returns programs that ends after 22 or starts before 23.
      query.getProgramListByDate('c20', t, { start: 22, span: 1}, function(err, list){
        assert.isNotNull(list);
        assert.equal(list.length, 1);
        done();
      });
    }