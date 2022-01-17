function(state, save_as_default) {
      var entity, tool, wall, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _results;
      window.game.clear_entities();
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
      window.game.settings = state.settings;
      window.viewModel.allowed_tools.removeAll();
      _ref1 = window.game.settings.tools;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        tool = _ref1[_j];
        window.viewModel.allowed_tools.push(tool);
      }
      window.viewModel.balls_needed(window.game.settings.balls_needed);
      if (!("seed" in window.game.settings)) {
        window.game.settings.seed = Math.random();
      }
      Math.seed_random(window.game.settings.seed);
      window.game.walls = state.walls;
      _ref2 = window.game.walls;
      _results = [];
      for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
        wall = _ref2[_k];
        _results.push(window.game.create_wall(wall));
      }
      return _results;
    }