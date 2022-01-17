function() {
  var tiler = createTiler({margin: 2});
  
  tiler.refresh();
  tiler.grid.css({top: -100, left: -150});
  tiler.refresh();

  deepEqual(tiler.grid.position(), {top: -200, left: -150});

  tiler.element.remove();
}