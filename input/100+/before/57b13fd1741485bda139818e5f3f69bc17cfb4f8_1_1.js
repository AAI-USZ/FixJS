function(/*args*/) {
    var node = curNode;
    _.each(arguments, function(i) {
      node = node.childNodes[i];
    });
    return node;
  }