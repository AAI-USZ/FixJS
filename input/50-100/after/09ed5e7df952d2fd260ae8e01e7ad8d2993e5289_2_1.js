function(err, list){
        assert.isNotNull(list);
        assert.equal(list.length, 3);
        for(var i=0; i<list.length-1; i++){
          assert.ok(list[i].start.getTime() < list[i+1].start.getTime());
        }
        done();
      }