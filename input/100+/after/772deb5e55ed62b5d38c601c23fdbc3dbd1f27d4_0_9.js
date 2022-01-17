function() {
  var tiler = createTiler({margin: 2});
  
  tiler.refresh();
  tiler.grid.css({left: -320, top: -320});
  tiler.refresh();

  deepEqual(tiler.grid.position(), {top: -220, left: -220});

  tiler.grid.css({left: -300, top: -300});
  tiler.refresh();

  deepEqual(tiler.grid.position(), {top: -200, left: -200});

  tiler.element.remove();
}