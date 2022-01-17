function line(d) {
    var that = this;
    d = defined ? d3.split(d, d3_svg_lineNot(defined)) : d.length ? [d] : [];
    d = d.map(function(d) {
      return "M" + interpolator(projection(d3_svg_linePoints(that, d, x, y)), tension);
    });
    return d.length ? d.join("") : null;
  }