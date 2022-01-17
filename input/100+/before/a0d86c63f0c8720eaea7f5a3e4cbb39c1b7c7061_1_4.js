function(state, save_as_default) {
      var entity, _i, _j, _len, _len1, _ref, _ref1, _results;
      if (save_as_default) {
        window.game.default_state = state;
        window.game.build_state = state;
      }
      if (state.dynamic) {
        _ref = state.dynamic;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          entity = _ref[_i];
          window.physics.create_entity(entity, "dynamic");
        }
      }
      if (state["static"]) {
        _ref1 = state["static"];
        _results = [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          entity = _ref1[_j];
          _results.push(window.physics.create_entity(entity, "static"));
        }
        return _results;
      }
    }