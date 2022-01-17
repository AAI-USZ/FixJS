function(){
      assert.deepEqual(quadtree.decode('0'), {lng : -90.0, lat : 45.0});
      assert.deepEqual(quadtree.decode('1'), {lng : 90.0, lat : 45.0});
      assert.deepEqual(quadtree.decode('2'), {lng : -90.0, lat : -45.0});
      assert.deepEqual(quadtree.decode('3'), {lng : 90.0, lat : -45.0});
    }