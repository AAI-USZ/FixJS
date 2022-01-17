function(scenes) {
  var e = scenes.$g.firstChild;
  for (var i = 0, n = scenes.length - 1; i < n; i++) {
    var s1 = scenes[i], s2 = scenes[i + 1];

    /* visible */
    if (!s1.visible || !s2.visible) continue;
    var fill = s1.fillStyle, stroke = s1.strokeStyle;
    if (!fill.opacity && !stroke.opacity) continue;

    /* points */
    var p = s1.left + "," + s1.top + " "
        + s2.left + "," + s2.top + " "
        + (s2.left + s2.width) + "," + (s2.top + s2.height) + " "
        + (s1.left + s1.width) + "," + (s1.top + s1.height);

    e = this.expect(e, "polygon", {
        "shape-rendering": s1.antialias ? null : "crispEdges",
        "cursor": s1.cursor,
        "points": p,
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