function() {
  var spy = sinon.spy();
  var tiler = createTiler({fetch: spy});

  tiler.refresh();
  tiler.show(dummyTiles());
  tiler.reload();

  var expToFetch = [[-1, -1], [0, -1], [1, -1], [-1, 0], [0, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];
  var expRemoved = [];

  deepEqual(spy.args[1][0], expToFetch);
  deepEqual(spy.args[1][1], expRemoved);
  
  tiler.element.remove();
}