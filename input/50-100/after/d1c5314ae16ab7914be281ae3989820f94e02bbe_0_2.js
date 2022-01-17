function mousemove() {
    if (!scene) return;
    pv.Mark.context(scene, index, function() {
        var m = this.mouse();
        p.x = v1.x + m.x;
        p.y = v1.y + m.y;
      });
  }