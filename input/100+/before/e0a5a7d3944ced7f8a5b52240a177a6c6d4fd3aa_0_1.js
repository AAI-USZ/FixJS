function() {

  var size = Math.PI*100

  var board = JXG.JSXGraph.initBoard('parabola', {boundingbox: [-size, size, size, -size], axis:true, showCopyright:false});

  var focal_point = board.create('point', [0, size/2], {name:'focal point'});

  var focal_y = function() {
    return -focal_point.Y();
  };

  var directix_a = board.create('point', [size, focal_y]);
  var directix_b = board.create('point', [-size, focal_y]);
  var directix = board.create('line', [directix_a, directix_b], {visible:true});

  //turn the point into a glider along the y axis
  var y_axis = board.create('line', [[0, size], [0, -size]], {visible:false});
  focal_point.makeGlider(y_axis);

  var a = board.create('point', [-size, 0], {visible:false});
  var b = board.create('point', [size, 0], {visible:false});

  var directix = board.create('line', [a, b], {visible:false});

//  var parab = board.create('parabola', [focal_point, directix, -size, size]);
  var parab = board.create('functiongraph', function(x) {
    return (x*x)/(4*focal_point.Y());
  });

  var x_axis = board.create('line', [[-100, 0], [100, 0]], {visible:false});
  var ray_glider = board.create('point', [100, 0]);
  ray_glider.makeGlider(x_axis);

  var p = board.create('point', [function() { return ray_glider.X(); }, function(){
    return Math.pow(ray_glider.X(),2)/(4*focal_point.Y());
  }], {visible:false});

  var ray_point = board.create('point', [function(){ return p.X(); }, function() {
    var a = 1000;
    if(p.Y() < 0){
      a = -a;
    }
    return p.Y() + 2 * a; 
  }]);


  var incoming_ray = board.create('arrow', [p, ray_point]);

  var reflected = board.create('segment', [focal_point, p]);


}