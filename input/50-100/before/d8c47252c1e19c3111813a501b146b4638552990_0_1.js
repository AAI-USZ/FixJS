function () {
  var self = this;

  this.nodeList = performSearch(this);
  this.searchList = [];

  // convert result to real nodes
  var realNodes = this.first ? this.nodeList.slice(0, 1) : this.nodeList.slice(0);

  return realNodes.map(function (elem) {
    return new Node(self.document, elem);
  });
}