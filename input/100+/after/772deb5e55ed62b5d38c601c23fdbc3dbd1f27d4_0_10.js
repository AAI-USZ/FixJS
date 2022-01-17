function() {
  var tiler = createTiler();
  
  tiler.refresh();
  tiler.show([
    [-1, -1, $('<div class="tile _0"></div>')],
    [ 0,  0, $('<div class="tile _1"></div>')],
    [ 1,  1, $('<div class="tile _2"></div>')]
  ]);

  tiler.grid.css({left: -200, top: -200});
  tiler.refresh();

  equal(tiler.grid.find('.tile._0').length, 0);
  equal(tiler.grid.find('.tile._1').length, 1);
  equal(tiler.grid.find('.tile._2').length, 1);
  equal(tiler.grid.find('.tile').length, 2);

  tiler.element.remove();
}