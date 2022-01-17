function(x) {
    if (!arguments.length) return linkDistance;
    linkDistance = d3_functor(x);
    return force;
  }