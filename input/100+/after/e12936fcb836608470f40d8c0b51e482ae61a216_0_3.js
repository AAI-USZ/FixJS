function(klass, board, min_age, cycle, count, max_radius) {
    return function() {
      var i, m, r, _i, _results;
      if (this.age < min_age || this.age % cycle !== 0) {
        return [];
      }
      _results = [];
      for (i = _i = 0; 0 <= count ? _i <= count : _i >= count; i = 0 <= count ? ++_i : --_i) {
        r = Random.prototype.int(1, max_radius);
        m = new klass;
        m.location = board.random_point_near(this.location, r);
        _results.push(m);
      }
      return _results;
    };
  }