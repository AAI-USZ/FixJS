function(){
      assert.deepEqual(quadtree.decode('0').origin, {lng : -90.0, lat : 45.0});
      assert.deepEqual(quadtree.decode('1').origin, {lng : 90.0, lat : 45.0});
      assert.deepEqual(quadtree.decode('2').origin, {lng : -90.0, lat : -45.0});
      assert.deepEqual(quadtree.decode('3').origin, {lng : 90.0, lat : -45.0});
    }