function() {
      var body, entity, fixtures, position, shape, state, vector, _i, _len, _ref;
      state = {
        "dynamic": [],
        "static": []
      };
      _ref = window.game.entities;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        entity = _ref[_i];
        body = entity.GetBody();
        position = body.GetPosition();
        fixtures = body.GetFixtureList();
        shape = fixtures.GetShape();
        entity = {
          "x": position.x,
          "y": position.y,
          "density": fixtures.GetDensity(),
          "friction": fixtures.GetFriction(),
          "restitution": fixtures.GetRestitution(),
          "angle": body.GetAngle(),
          "shape": {
            "type": "rectangle"
          }
        };
        if (shape.GetType() === 1) {
          entity.shape.type = 'polygon';
          entity.shape.vectors = [];
          for (vector in shape.m_vertices) {
            entity.shape.vectors.push({
              "x": shape.m_vertices[vector].x,
              "y": shape.m_vertices[vector].y
            });
          }
        } else if (shape.GetType() === 0) {
          entity.shape.type = 'circle';
          entity.shape.size = shape.m_radius;
        }
        if (body.GetType() === B2Body.b2_staticBody) {
          state["static"].push(entity);
        } else {
          state.dynamic.push(entity);
        }
      }
      return state;
    }