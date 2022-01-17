function() {
      var entity, _i, _len, _ref;
      _ref = window.game.entities;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        entity = _ref[_i];
        window.physics.world.DestroyBody(entity.GetBody());
      }
      window.game.entities = [];
      return window.game.load_state(window.game.default_state);
    }