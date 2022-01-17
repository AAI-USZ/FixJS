function() {
      var i, m, possible, r, _results;
      if (this.age < min_age) {
        return [];
      }
      possible = Math.min(max_made_per_spawn, remaining);
      i = Random.prototype.int(1, possible);
      _results = [];
      while (remaining > 0 && i > 0) {
        remaining -= 1;
        i -= 1;
        r = Random.prototype.int(1, max_radius);
        m = new klass;
        m.location = board.random_point_near(this.location, r);
        _results.push(m);
      }
      return _results;
    }