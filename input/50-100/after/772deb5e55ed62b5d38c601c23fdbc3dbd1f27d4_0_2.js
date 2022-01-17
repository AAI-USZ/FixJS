function() {
  var tiler = createTiler();
  
  tiler.refresh();
  tiler.grid.css({left: -150, top: -150});
  tiler.coords(0, 0);

  deepEqual(tiler.grid.position(), {top: -100, left: -100});

  tiler.element.remove();
}