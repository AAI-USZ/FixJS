function(entity) {
      var fixDef, vector, vectors, _i, _len, _ref;
      fixDef = new B2FixtureDef();
      if ("density" in entity.physics) {
        fixDef.density = entity.physics.density;
      }
      if ("friction" in entity.physics) {
        fixDef.friction = entity.physics.friction;
      }
      if ("restitution" in entity.physics) {
        fixDef.restitution = entity.physics.restitution;
      }
      if (entity.physics.shape.type === "circle") {
        fixDef.shape = new B2CircleShape(entity.physics.shape.size);
      } else if (entity.physics.shape.type === "rectangle") {
        fixDef.shape = new B2PolygonShape();
        fixDef.shape.SetAsBox(entity.physics.shape.size.width, entity.physics.shape.size.height);
      } else if (entity.physics.shape.type === "polygon") {
        fixDef.shape = new B2PolygonShape();
        vectors = [];
        _ref = entity.physics.shape.vectors;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          vector = _ref[_i];
          vectors.push(new B2Vec2(vector.x, vector.y));
        }
        fixDef.shape.SetAsArray(vectors);
      }
      return fixDef;
    }