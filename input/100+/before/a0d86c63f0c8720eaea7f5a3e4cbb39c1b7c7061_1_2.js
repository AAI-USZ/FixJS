function(entity) {
      var fixDef, vector, vectors, _i, _len, _ref;
      fixDef = new B2FixtureDef();
      fixDef.density = entity.density;
      fixDef.friction = entity.friction;
      fixDef.restitution = entity.restitution;
      if (entity.shape.type === "circle") {
        fixDef.shape = new B2CircleShape(entity.shape.size);
      } else if (entity.shape.type === "rectangle") {
        fixDef.shape = new B2PolygonShape();
        fixDef.shape.SetAsBox(entity.shape.size.width, entity.shape.size.height);
      } else if (entity.shape.type === "polygon") {
        fixDef.shape = new B2PolygonShape();
        vectors = [];
        _ref = entity.shape.vectors;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          vector = _ref[_i];
          vectors.push(new B2Vec2(vector.x, vector.y));
        }
        fixDef.shape.SetAsArray(vectors);
      }
      return fixDef;
    }