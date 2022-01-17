function() {
    var nodes = this.olist.childNodes;
    return Array.prototype.map.call(nodes, function extractOrigin(node) {
      return node.dataset.origin;
    });
  }