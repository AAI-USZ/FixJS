function() {
  var newDummyTiles = [
    [ 2, -1, $('<div class="tile _9">9</div>')],
    [ 2,  0, $('<div class="tile _10">10</div>')],
    [ 2,  1, $('<div class="tile _11">11</div>')],
    [-1,  2, $('<div class="tile _12">12</div>')],
    [ 0,  2, $('<div class="tile _13">13</div>')],
    [ 1,  2, $('<div class="tile _14">14</div>')],
    [ 2,  2, $('<div class="tile _15">15</div>')]
  ];

  var tiler = createTiler();
  
  tiler.refresh();
  tiler.show(dummyTiles());

  tiler.element.height(200);
  tiler.element.width(200);

  tiler.refresh();
  tiler.show(newDummyTiles);

  deepEqual(tiler.grid.find('.tile._9').position(), {left: 300, top: 0});
  deepEqual(tiler.grid.find('.tile._10').position(), {left: 300, top: 100});
  deepEqual(tiler.grid.find('.tile._11').position(), {left: 300, top: 200});
  deepEqual(tiler.grid.find('.tile._12').position(), {left: 0, top: 300});
  deepEqual(tiler.grid.find('.tile._13').position(), {left: 100, top: 300});
  deepEqual(tiler.grid.find('.tile._14').position(), {left: 200, top: 300});
  deepEqual(tiler.grid.find('.tile._15').position(), {left: 300, top: 300});

  tiler.element.remove();
}