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
  var d = "", t = "M";
  for (var i = 0; i < scenes.length; i++) {
    var si = scenes[i];
    d += t + si.left + "," + si.top;

    /* interpolate (assume linear by default) */
    if (i < scenes.length - 1) {
      t = "L";
      var sj = scenes[i + 1];
      switch (s.interpolate) {
        case "polar": {
          var dx = sj.left - si.left,
              dy = sj.top - si.top,
              r = Math.sqrt(dx * dx + dy * dy) / 2;
          d += "A" + r + "," + r + " 0 1,1";
          t = " ";
          break;
        }
        case "step-before": {
          d += "V" + sj.top;
          break;
        }
        case "step-after": {
          d += "H" + sj.left;
          break;
        }
      }
    }
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