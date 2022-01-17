function() {
      var graphEdges,
        _this = this;
      graphEdges = [];
      this.eachSquare(function(pos) {
        return Game.Utils.concat(graphEdges, _this._squareToEdges(pos));
      });
      return graphEdges;
    }