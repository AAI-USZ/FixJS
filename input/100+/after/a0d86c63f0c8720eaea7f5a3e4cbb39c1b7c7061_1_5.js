function(state, save_as_default) {
      var entity, wall, _i, _j, _len, _len1, _ref, _ref1, _results;
      if (save_as_default) {
        window.game.default_state = state;
        window.game.build_state = state;
      }
      if (state.entities) {
        _ref = state.entities;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          entity = _ref[_i];
          window.game.create_entity(entity);
        }
      }
      window.game.walls = state.walls;
      _ref1 = window.game.walls;
      _results = [];
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        wall = _ref1[_j];
        _results.push(window.game.create_wall(wall));
      }
      return _results;
    }