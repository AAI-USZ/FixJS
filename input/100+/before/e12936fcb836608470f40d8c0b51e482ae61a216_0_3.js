function(board, direction_change_chance, max_radius) {
    return function() {
      var r;
      r = Random.prototype.int(1, max_radius);
      return this.location = board.random_point_near(this.location, r);
    };
  }