function () {
  var self = this;
  
  if (this.searchList.length !== 0) {
    this.nodeList = performSearch(this);
    this.filled = true;
    this.searchList = [];
  }
  
  // convert result to real nodes
  var realNodes = this.first ? this.nodeList.slice(0, 1) : this.nodeList.slice(0);

  return realNodes.map(function (elem) {
    return new Node(self.document, elem);
  });
}