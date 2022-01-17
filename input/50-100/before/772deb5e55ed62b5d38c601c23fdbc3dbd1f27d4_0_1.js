function() {
  var tiler = createTiler();
  
  tiler.refresh();
  
  tiler.grid.css('left', -1000);
  tiler.grid.css('top', -1000);
  tiler.refresh();
  
  deepEqual(tiler.grid.position(), {left: -100, top: -100});
  
  tiler.element.remove();
}