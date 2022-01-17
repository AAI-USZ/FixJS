function(scenes) {
  var e = scenes.$g.firstChild;
  if (scenes.length < 2) return e;
  var s = scenes[0];

  /* segmented */
  if (s.segmented) return this.lineSegment(scenes);

  /* visible */
  if (!s.visible) return e;
  var fill = s.fillStyle, stroke = s.strokeStyle;
  if (!fill.opacity && !stroke.opacity) return e;

  /* points */
  var d = "M" + s.left + "," + s.top;
  for (var i = 1; i < scenes.length; i++) {
    d += this.pathSegment(scenes[i - 1], scenes[i]);
  }

  e = this.expect(e, "path", {
      "shape-rendering": s.antialias ? null : "crispEdges",
      "cursor": s.cursor,
      "d": d,
      "fill": fill.color,
      "fill-opacity": fill.opacity || null,
      "stroke": stroke.color,
      "stroke-opacity": stroke.opacity || null,
      "stroke-width": stroke.opacity ? s.lineWidth / this.scale : null
    });
  return this.append(e, scenes, 0);
}