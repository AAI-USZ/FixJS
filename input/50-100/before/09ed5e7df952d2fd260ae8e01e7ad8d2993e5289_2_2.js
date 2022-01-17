function(err, list){
        assert.isNotNull(list);
        assert.equal(list.length, 1);
        done();
      }