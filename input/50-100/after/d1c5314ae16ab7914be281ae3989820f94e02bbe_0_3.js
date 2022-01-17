function mouseup() {
    if (!scene) return;
    mousemove();
    p.fixed = false;
    p = null;
    scene = null;
  }