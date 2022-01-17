function(tofetch, removed) {
      if (++calls == 1) {
        tiler.show(dummyTiles());
      }
      if (calls == 2) {
        deepEqual(removed, [[1,-1],[1, 0],[-1, 1],[0, 1],[1, 1]]);
      }
    }