function pg_getAppsList() {
    var nodes = this.olist.children;
    return Array.prototype.map.call(nodes, function extractOrigin(node) {
      return node.dataset.origin;
    });
  }