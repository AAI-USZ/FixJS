function() {
      var foodStrings, graph, pairs;
      graph = new SNAKE.Graph(this.grid.toGraph());
      this.game.log(graph);
      foodStrings = this.grid.foodItems._queue.map(function(item) {
        return item.toString();
      });
      pairs = graph.dijkstras.apply(graph, [this.head.toString()].concat(__slice.call(foodStrings)));
      pairs = pairs.map(function(pair) {
        return new SNAKE.Pair(pair);
      });
      this.game.log('dijkstras calculated:');
      this.game.log(pairs.toString());
      return pairs;
    }