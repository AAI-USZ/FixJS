function() {
      var graphEdges;
      graphEdges = [];
      this.eachSquare(function(pos) {
        return this.graphEdges.concat(this._squareToGraphEdges(this, pos));
      });
      return graphEdges;
    }