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
  tiler.show(newDummyTiles);

  ok(!tiler.grid.find('.tile._9').length);
  ok(!tiler.grid.find('.tile._10').length);
  ok(!tiler.grid.find('.tile._11').length);
  ok(!tiler.grid.find('.tile._12').length);
  ok(!tiler.grid.find('.tile._13').length);
  ok(!tiler.grid.find('.tile._14').length);
  ok(!tiler.grid.find('.tile._15').length);

  tiler.element.remove();
}