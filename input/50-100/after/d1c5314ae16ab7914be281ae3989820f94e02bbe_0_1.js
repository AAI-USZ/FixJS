function mousedown(d) {
    index = this.index;
    scene = this.scene;
    var m = this.mouse();
    v1 = pv.vector(d.x, d.y).minus(m);
    p = d;
    p.fixed = true;
  }