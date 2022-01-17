function() {
  var tiler = createTiler();
  
  tiler.refresh();

  tiler.grid.css('left', -200);
  tiler.grid.css('top', -200);
  tiler.refresh();

  deepEqual(tiler.grid.find('.tile._4').position(), {left: 0, top: 0});
  deepEqual(tiler.grid.find('.tile._5').position(), {left: 100, top: 0});
  deepEqual(tiler.grid.find('.tile._7').position(), {left: 0, top: 100});
  deepEqual(tiler.grid.find('.tile._8').position(), {left: 100, top: 100});

  tiler.element.remove();
}