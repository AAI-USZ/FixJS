function() {
  var tiler = createTiler();
  
  tiler.refresh();  
  tiler.show(dummyTiles());

  deepEqual(tiler.element.find('.tile._0').position(), {top: 0, left: 0});
  deepEqual(tiler.element.find('.tile._1').position(), {top: 0, left: 100});
  deepEqual(tiler.element.find('.tile._2').position(), {top: 0, left: 200});
  deepEqual(tiler.element.find('.tile._3').position(), {top: 100, left: 0});
  deepEqual(tiler.element.find('.tile._4').position(), {top: 100, left: 100});
  deepEqual(tiler.element.find('.tile._5').position(), {top: 100, left: 200});
  deepEqual(tiler.element.find('.tile._6').position(), {top: 200, left: 0});
  deepEqual(tiler.element.find('.tile._7').position(), {top: 200, left: 100});
  deepEqual(tiler.element.find('.tile._8').position(), {top: 200, left: 200});
  deepEqual(tiler.element.find('.tile').length, 9);

  tiler.element.remove();
}