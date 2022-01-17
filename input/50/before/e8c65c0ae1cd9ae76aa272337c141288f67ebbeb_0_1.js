function(pos) {
        return this.graphEdges.concat(this._squareToGraphEdges(this, pos));
      }