function(x) {
    if (!arguments.length) return linkStrength;
    linkStrength = d3.functor(x);
    return force;
  }