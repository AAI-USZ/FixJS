function() {
  var calls = 0;
  var tiler = createTiler({
    fetch: function(tofetch) {
      if (++calls == 1) {
        tiler.show(dummyTiles());
      }
      if (calls == 2) {
        deepEqual(tofetch, [[-1, -1], [0, -1], [1, -1], [-1,  0],
          [0,  0], [1,  0], [-1,  1], [0,  1], [1,  1]]);
      }
    }
  });

  tiler.refresh();
  tiler.reload();
  
  tiler.element.remove();
}