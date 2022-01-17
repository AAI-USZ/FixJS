function(x, y) {

  for(var i = 0; i < this.edges.length; i++) {
    this.edges[i].translate(x, y);
  }
}