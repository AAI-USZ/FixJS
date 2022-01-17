function() {
  var tiler = createTiler({margin: 2});
  
  tiler.refresh();
  tiler.grid.css({top: -150, left: -100});
  tiler.refresh();

  deepEqual(tiler.grid.position(), {top: -150, left: -200});

  tiler.element.remove();
}