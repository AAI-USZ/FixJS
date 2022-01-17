function() {
      var foodPositions, graph, pairs;
      foodPositions = this.grid.visibleFood();
      if (!foodPositions.length) {
        return [];
      }
      graph = new SNAKE.Graph(this.grid.toGraph());
      pairs = graph.dijkstras.apply(graph, [this.head.toString()].concat(__slice.call(foodPositions)));
      pairs = pairs.map(function(pair) {
        return new SNAKE.Pair(pair);
      });
      return pairs;
    }