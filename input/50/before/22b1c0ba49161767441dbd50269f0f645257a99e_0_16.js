function(x) {
    if (!arguments.length) return linkDistance;
    linkDistance = d3.functor(x);
    return force;
  }