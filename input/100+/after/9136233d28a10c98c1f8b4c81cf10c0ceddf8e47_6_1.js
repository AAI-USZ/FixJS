function() {
      var foodStrings, graph, pairs;
      graph = new Game.Graph(this.grid.toGraph());
      Game.log(graph);
      foodStrings = this.grid.foodItems._queue.map(function(item) {
        return item.toString();
      });
      pairs = graph.dijkstras.apply(graph, [this.head.toString()].concat(__slice.call(foodStrings)));
      pairs = pairs.map(function(pair) {
        return new Game.Pair(pair);
      });
      Game.log(pairs);
      return pairs;
    }