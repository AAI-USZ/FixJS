function (size) {
    var asteroid = zap.make_sprite($path(), this.layers.asteroids, ur_asteroid);
    asteroid.size = size;
    var r = window["$ASTEROID_{0}_R".fmt(size)];
    var r_amp = window["$ASTEROID_{0}_R_AMP".fmt(size)];
    var sectors = window["$ASTEROID_{0}_SECTORS".fmt(size)];
    asteroid.score = window["$ASTEROID_{0}_SCORE".fmt(size)];
    asteroid.debris = 2 * sectors;
    var points = [];
    asteroid.r = 0;
    for (var i = 0; i < sectors; ++i) {
      var th = i * (2 * Math.PI / sectors);
      var r = r + zap.random_int(-r_amp, r_amp);
      if (r > asteroid.r) {
        asteroid.r = r;
      }
      points.push([r * Math.cos(th), r * Math.sin(th)]);
    }
    asteroid.r_collide = r;
    asteroid.elem.setAttribute("d", "M{0}Z".fmt(points.map(function (p) {
      return p.join(",");
    }).join("L")));
    return asteroid;
  }