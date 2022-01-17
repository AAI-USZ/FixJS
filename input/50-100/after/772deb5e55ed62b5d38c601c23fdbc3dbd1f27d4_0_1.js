function() {
  var tiler = createTiler({margin: 2});
  
  tiler.refresh();
  tiler.grid.css({top: -300, left: -250});
  tiler.refresh();

  deepEqual(tiler.grid.position(), {top: -200, left: -250});

  tiler.element.remove();
}