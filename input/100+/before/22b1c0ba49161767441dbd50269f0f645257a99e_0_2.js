function d3_svg_line(projection) {
  var x = d3_svg_lineX,
      y = d3_svg_lineY,
      defined,
      interpolate = d3_svg_lineInterpolatorDefault,
      interpolator = d3_svg_lineInterpolators.get(interpolate),
      tension = .7;

  function line(d) {
    var that = this;
    d = defined ? d3.split(d, d3_svg_lineNot(defined)) : d.length ? [d] : [];
    d = d.map(function(d) {
      return "M" + interpolator(projection(d3_svg_linePoints(that, d, x, y)), tension);
    });
    return d.length ? d.join("") : null;
  }

  line.x = function(_) {
    if (!arguments.length) return x;
    x = _;
    return line;
  };

  line.y = function(_) {
    if (!arguments.length) return y;
    y = _;
    return line;
  };

  line.defined  = function(_) {
    if (!arguments.length) return defined;
    defined = _;
    return line;
  };

  line.interpolate = function(_) {
    if (!arguments.length) return interpolate;
    if (!d3_svg_lineInterpolators.has(_ += "")) _ = d3_svg_lineInterpolatorDefault;
    interpolator = d3_svg_lineInterpolators.get(interpolate = _);
    return line;
  };

  line.tension = function(_) {
    if (!arguments.length) return tension;
    tension = _;
    return line;
  };

  return line;
}