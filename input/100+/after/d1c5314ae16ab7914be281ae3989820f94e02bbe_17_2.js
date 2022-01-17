function(scenes) {
  var e = scenes.$g.firstChild;
  for (var i = 0, n = scenes.length - 1; i < n; i++) {
    var s1 = scenes[i], s2 = scenes[i + 1];

    /* visible */
    if (!s1.visible || !s2.visible) continue;
    var stroke = s1.strokeStyle, fill = pv.Color.transparent;
    if (!stroke.opacity) continue;

    /* interpolate */
    var d;
    if (s1.interpolate == "linear") {
      fill = stroke;
      stroke = pv.Color.transparent;
      d = this.pathJoin(scenes[i - 1], s1, s2, scenes[i + 2]);
    } else {
      d = "M" + s1.left + "," + s1.top + this.pathSegment(s1, s2);
    }

    e = this.expect(e, "path", {
        "shape-rendering": s1.antialias ? null : "crispEdges",
        "cursor": s1.cursor,
        "d": d,
        "fill": fill.color,
        "fill-opacity": fill.opacity || null,
        "stroke": stroke.color,
        "stroke-opacity": stroke.opacity || null,
        "stroke-width": stroke.opacity ? s1.lineWidth / this.scale : null
      });
    e = this.append(e, scenes, i);
  }
  return e;
}