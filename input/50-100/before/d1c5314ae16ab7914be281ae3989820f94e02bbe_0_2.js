function mousedown(d) {
    target = this;
    index = target.index;
    scene = target.scene;
    var m = this.mouse();
    v1 = pv.vector(d.x, d.y).minus(m);
    p = d;
    p.fixed = true;
  }