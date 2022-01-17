function area(d) {
    var that = this;
    d = defined ? d3.split(d, d3_svg_lineNot(defined)) : d.length ? [d] : [];
    d = d.map(function(d) {
      var points0 = d3_svg_linePoints(that, d, x0, y0);
      return "M" + i0(projection(d3_svg_linePoints(that, d, x0 === x1 ? d3_svg_areaX(points0) : x1, y0 === y1 ? d3_svg_areaY(points0) : y1)), tension)
           + "L" + i1(projection(points0.reverse()), tension)
           + "Z";
    });
    return d.length ? d.join("") : null;
  }