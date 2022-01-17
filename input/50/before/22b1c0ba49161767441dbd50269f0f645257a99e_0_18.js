function(x) {
    if (!arguments.length) return ranger;
    ranger = d3.functor(x);
    return histogram;
  }