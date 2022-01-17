function() {
      var elk, grass, next_grasses, _i, _j, _len, _len1, _ref, _ref1, _results;
      next_grasses = [];
      _ref = this.grasses;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        grass = _ref[_i];
        grass.age += 1;
        if (grass.age <= this.config.grass.max_age) {
          grass.diseased = grass.diseased || Random.prototype.chance(this.config.grass.disease.chance);
          next_grasses.push(grass);
          next_grasses.push.apply(next_grasses, grass.spawn());
        }
      }
      this.grasses = next_grasses;
      _ref1 = this.elk;
      _results = [];
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        elk = _ref1[_j];
        _results.push(elk.move());
      }
      return _results;
    }