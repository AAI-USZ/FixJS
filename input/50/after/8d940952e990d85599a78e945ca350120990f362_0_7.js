function(_) {
    if (!arguments.length) return precision / d3_geo_radians;
    precision = _ * d3_geo_radians;
    return greatArc;
  }