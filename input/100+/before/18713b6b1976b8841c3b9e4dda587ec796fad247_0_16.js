function() {
  var source = d3_geo_greatArcSource,
      target = d3_geo_greatArcTarget,
      precision = 6 * d3_geo_radians;

  function greatArc() {
    var a = typeof source === "function" ? source.apply(this, arguments) : source,
        b = typeof target === "function" ? target.apply(this, arguments) : target,
        i = d3_geo_greatArcInterpolate(a, b),
        dt = precision / i.d,
        t = 0,
        coordinates = [a];
    while ((t += dt) < 1) coordinates.push(i(t));
    coordinates.push(b);
    return {
      type: "LineString",
      coordinates: coordinates
    };
  }

  // Length returned in radians; multiply by radius for distance.
  greatArc.distance = function() {
    var a = typeof source === "function" ? source.apply(this, arguments) : source,
        b = typeof target === "function" ? target.apply(this, arguments) : target;
     return d3_geo_greatArcInterpolate(a, b).d;
  };

  greatArc.source = function(x) {
    if (!arguments.length) return source;
    source = x;
    return greatArc;
  };

  greatArc.target = function(x) {
    if (!arguments.length) return target;
    target = x;
    return greatArc;
  };

  // Precision is specified in degrees.
  greatArc.precision = function(x) {
    if (!arguments.length) return precision / d3_geo_radians;
    precision = x * d3_geo_radians;
    return greatArc;
  };

  return greatArc;
}