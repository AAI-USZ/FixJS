function() {
  var tiler = createTiler({margin: 2});
  
  tiler.refresh();

  tiler.grid.css('left', -230).css('top', -230); tiler.refresh();
  tiler.grid.css('left', -270).css('top', -270); tiler.refresh();
  tiler.grid.css('left', -300).css('top', -300); tiler.refresh();

  equal(tiler.grid.css('left'), '-200px');
  equal(tiler.grid.css('top'), '-200px');

  tiler.element.remove();
}