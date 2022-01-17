function(scenes) {
  var e = scenes.$g.firstChild;
  for (var i = 0, n = scenes.length - 1; i < n; i++) {
    var s1 = scenes[i], s2 = scenes[i + 1];

    /* visible */
    if (!s1.visible || !s2.visible) continue;
    var stroke = s1.strokeStyle;
    if (!stroke.opacity) continue;

    /* Line-line intersection, per Akenine-Moller 16.16.1. */
    function intersect(o1, d1, o2, d2) {
      return o1.plus(d1.times(o2.minus(o1).dot(d2.perp()) / d1.dot(d2.perp())));
    }

    /*
     * P1-P2 is the current line segment. V is a vector that is perpendicular to
     * the line segment, and has length lineWidth / 2. ABCD forms the initial
     * bounding box of the line segment (i.e., the line segment if we were to do
     * no joins).
     */
    var p1 = pv.vector(s1.left, s1.top),
        p2 = pv.vector(s2.left, s2.top),
        p = p2.minus(p1),
        v = p.perp().norm(),
        w = v.times(s1.lineWidth / (2 * this.scale)),
        a = p1.plus(w),
        b = p2.plus(w),
        c = p2.minus(w),
        d = p1.minus(w);

    /*
     * Start join. P0 is the previous line segment's start point. We define the
     * cutting plane as the average of the vector perpendicular to P0-P1, and
     * the vector perpendicular to P1-P2. This insures that the cross-section of
     * the line on the cutting plane is equal if the line-width is unchanged.
     * Note that we don't implement miter limits, so these can get wild.
     */
    if (i > 0) {
      var s0 = scenes[i - 1];
      if (s0.visible) {
        var v1 = p1.minus(s0.left, s0.top).perp().norm().plus(v);
        d = intersect(p1, v1, d, p);
        a = intersect(p1, v1, a, p);
      }
    }

    /* Similarly, for end join. */
    if (i < (n - 1)) {
      var s3 = scenes[i + 2];
      if (s3.visible) {
        var v2 = pv.vector(s3.left, s3.top).minus(p2).perp().norm().plus(v);
        c = intersect(p2, v2, c, p);
        b = intersect(p2, v2, b, p);
      }
    }

    /* points */
    var p = a.x + "," + a.y + " "
      + b.x + "," + b.y + " "
      + c.x + "," + c.y + " "
      + d.x + "," + d.y;

    e = this.expect(e, "polygon", {
        "shape-rendering": s1.antialias ? null : "crispEdges",
        "cursor": s1.cursor,
        "points": p,
        "fill": stroke.color,
        "fill-opacity": stroke.opacity || null
      });
    e = this.append(e, scenes, i);
  }
  return e;
}