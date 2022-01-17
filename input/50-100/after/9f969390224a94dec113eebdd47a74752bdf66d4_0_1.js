function(name, value) {
  var names = d3_collapse(name).split(" "),
      n = names.length,
      i = -1;
  if (arguments.length > 1) {
    while (++i < n) d3_selection_classed.call(this, names[i], value);
    return this;
  } else {
    while (++i < n) if (!d3_selection_classed.call(this, names[i])) return false;
    return true;
  }
}