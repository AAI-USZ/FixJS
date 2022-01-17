function(entity, type) {
      var body, bodyDef, created_entity, fixDef;
      bodyDef = new B2BodyDef();
      if (type === "static") {
        bodyDef.type = B2Body.b2_staticBody;
      } else {
        bodyDef.type = B2Body.b2_dynamicBody;
      }
      bodyDef.position.Set(entity.x, entity.y);
      if ('angle' in entity) {
        bodyDef.angle = entity.angle;
      }
      fixDef = window.physics.create_fixture_def(entity);
      body = window.physics.world.CreateBody(bodyDef);
      created_entity = body.CreateFixture(fixDef);
      window.game.entities.push(created_entity);
      if ('id' in entity) {
        return window.game.entityIDs[entity.id] = created_entity;
      }
    }