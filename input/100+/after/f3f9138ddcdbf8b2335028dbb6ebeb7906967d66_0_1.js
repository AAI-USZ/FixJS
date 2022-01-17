function(tile) {
        tile.r = tile.r || 0;
        var vertices = this.createVertices(tile);

        var bodyDef = new Box2D.Dynamics.b2BodyDef();
        bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
        bodyDef.position.x = tile.x * Settings.TILE_SIZE / Settings.RATIO;
        bodyDef.position.y = tile.y * Settings.TILE_SIZE / Settings.RATIO;
        bodyDef.angle = tile.r * 90 * Math.PI / 180;

        var tileShape = new Box2D.Collision.Shapes.b2PolygonShape();
        
        tileShape.SetAsArray(vertices, vertices.length);

        var fixtureDef = new Box2D.Dynamics.b2FixtureDef();
        fixtureDef.shape = tileShape;
        fixtureDef.density = 0;
        fixtureDef.friction = Settings.TILE_FRICTION;
        fixtureDef.restitution = Settings.TILE_RESTITUTION;
        fixtureDef.isSensor = false;
        fixtureDef.userData = Detector.COLLISION_IDENTIFIER_TILE;

        this.engine.createBody(bodyDef).CreateFixture(fixtureDef);
    }