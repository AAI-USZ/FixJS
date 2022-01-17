function(x) {
    if (!arguments.length) return linkStrength;
    linkStrength = d3_functor(x);
    return force;
  }