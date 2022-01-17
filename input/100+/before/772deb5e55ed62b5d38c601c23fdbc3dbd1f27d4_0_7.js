function() {
  var tiler = createTiler({margin: 2});
  
  tiler.refresh();

  tiler.grid.css('left', -320);
  tiler.grid.css('top', -320);
  tiler.refresh();

  equal(tiler.grid.css('left'), '-220px');
  equal(tiler.grid.css('top'), '-220px');

  tiler.grid.css('left', -300);
  tiler.grid.css('top', -300);
  tiler.refresh();

  equal(tiler.grid.css('left'), '-200px');
  equal(tiler.grid.css('top'), '-200px');

  tiler.element.remove();
}