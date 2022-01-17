function(x) {
    if (!arguments.length) return ranger;
    ranger = d3_functor(x);
    return histogram;
  }