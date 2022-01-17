function d3_svg_lineNot(f) {
  return function() {
    return !f.apply(this, arguments);
  };
}