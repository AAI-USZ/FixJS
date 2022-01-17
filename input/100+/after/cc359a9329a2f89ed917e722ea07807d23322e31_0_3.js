function(node, i, j) {
    d3_transitionDelay = node.delay;
    d3_transitionDuration = node.duration;
    callback.call(node = node.node, node.__data__, i, j);
  }