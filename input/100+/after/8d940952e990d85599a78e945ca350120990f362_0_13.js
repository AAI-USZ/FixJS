function() {
  var source = d3_geo_greatArcSource, p0,
      target = d3_geo_greatArcTarget, p1,
      precision = 6 * d3_geo_radians,
      interpolate = d3_geo_greatArcInterpolator();

  function greatArc() {
    var d = greatArc.distance.apply(this, arguments), // initializes the interpolator, too
        t = 0,
        dt = precision / d,
        coordinates = [p0];
    while ((t += dt) < 1) coordinates.push(interpolate(t));
    coordinates.push(p1);
    return {type: "LineString", coordinates: coordinates};
  }

  // Length returned in radians; multiply by radius for distance.
  greatArc.distance = function() {
    if (typeof source === "function") interpolate.source(p0 = source.apply(this, arguments));
    if (typeof target === "function") interpolate.target(p1 = target.apply(this, arguments));
    return interpolate.distance();
  };

  greatArc.source = function(_) {
    if (!arguments.length) return source;
    source = _;
    if (typeof source !== "function") interpolate.source(p0 = source);
    return greatArc;
  };

  greatArc.target = function(_) {
    if (!arguments.length) return target;
    target = _;
    if (typeof target !== "function") interpolate.target(p1 = target);
    return greatArc;
  };

  // Precision is specified in degrees.
  greatArc.precision = function(_) {
    if (!arguments.length) return precision / d3_geo_radians;
    precision = _ * d3_geo_radians;
    return greatArc;
  };

  return greatArc;
}