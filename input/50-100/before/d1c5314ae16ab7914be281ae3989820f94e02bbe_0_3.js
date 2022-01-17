function mousemove() {
    if (!target) return;
    setup();
    var m = target.mouse();
    p.x = v1.x + m.x;
    p.y = v1.y + m.y;
  }