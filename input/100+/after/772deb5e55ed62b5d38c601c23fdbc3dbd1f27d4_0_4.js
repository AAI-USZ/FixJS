function() {
  var tiler = createTiler();
  
  tiler.refresh();
  tiler.show([
    [-1, -1, $('<div class="tile _0"></div>')],
    [ 0,  0, $('<div class="tile _1"></div>')],
    [ 1,  1, $('<div class="tile _2"></div>')]
  ]);

  deepEqual(tiler.element.find('.tile._0').position(), {top: 0, left: 0});
  deepEqual(tiler.element.find('.tile._1').position(), {top: 100, left: 100});
  deepEqual(tiler.element.find('.tile._2').position(), {top: 200, left: 200});
  deepEqual(tiler.element.find('.tile').length, 3);

  tiler.element.remove();
}