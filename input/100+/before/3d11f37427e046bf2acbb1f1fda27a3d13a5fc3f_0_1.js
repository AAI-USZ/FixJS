function() {

  var size = Math.PI*100

  var board = JXG.JSXGraph.initBoard('parabola', {boundingbox: [-size, size, size, -size], axis:true, showCopyright:false});

  var focal_point = board.create('point', [0, size/2], {name:'focal point'});

  //turn the point into a glider along the y axis
  var glide_point_a = board.create('point', [0, size], {visible:false});
  var glide_point_b = board.create('point', [0, -size], {visible:false});
  var glide_line = board.create('line', [glide_point_a, glide_point_b], {visible:false});
  focal_point.makeGlider(glide_line);

  var a = board.create('point', [-size, 0], {visible:false});
  var b = board.create('point', [size, 0], {visible:false});

  var directix = board.create('line', [a, b], {visible:false});

  var parab = board.create('parabola', [focal_point, directix, -size, size]);

}