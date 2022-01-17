function() {
  var tiler = createTiler();
  tiler.refresh();

  tiler.grid.css('left', -200);
  tiler.grid.css('top', -200);
  tiler.refresh();

  equal(tiler.grid.find('.tile').length, 4);
  equal(tiler.grid.find('.tile._0').length, 0);
  equal(tiler.grid.find('.tile._1').length, 0);
  equal(tiler.grid.find('.tile._2').length, 0);
  equal(tiler.grid.find('.tile._3').length, 0);
  equal(tiler.grid.find('.tile._6').length, 0);

  tiler.element.remove();
}