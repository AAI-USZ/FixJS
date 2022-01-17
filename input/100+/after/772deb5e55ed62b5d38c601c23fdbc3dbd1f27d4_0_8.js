function() {
  var tiler = createTiler();
  
  tiler.refresh();
  tiler.show(dummyTiles());
  tiler.grid.css({left: 0, top: 0});
  tiler.refresh();

  equal(tiler.grid.find('.tile').length, 4);
  equal(tiler.grid.find('.tile._2').length, 0);
  equal(tiler.grid.find('.tile._5').length, 0);
  equal(tiler.grid.find('.tile._8').length, 0);
  equal(tiler.grid.find('.tile._6').length, 0);
  equal(tiler.grid.find('.tile._7').length, 0);

  tiler.element.remove();
}