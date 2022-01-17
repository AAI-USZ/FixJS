function(entity) {
      var body, bodyDef, fixDef;
      bodyDef = new B2BodyDef();
      if (entity.fixed) {
        bodyDef.type = B2Body.b2_staticBody;
      } else {
        bodyDef.type = B2Body.b2_dynamicBody;
      }
      console.log(entity.x, entity.y);
      bodyDef.position.Set(entity.x, entity.y);
      if ('angle' in entity) {
        bodyDef.angle = entity.angle;
      }
      fixDef = window.physics.create_fixture_def(entity);
      body = window.physics.world.CreateBody(bodyDef);
      return entity.fixture = body.CreateFixture(fixDef);
    }