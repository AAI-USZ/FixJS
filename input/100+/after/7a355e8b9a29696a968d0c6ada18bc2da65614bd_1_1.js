function (world) {

        var bodyDef = new Box2D.Dynamics.b2BodyDef();
        bodyDef.position.x = 220 / Settings.RATIO;
        bodyDef.position.y = 0 / Settings.RATIO;
        bodyDef.fixedRotation = true;
        bodyDef.linearDamping = Settings.PLAYER_LINEAR_DAMPING;
        bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
        bodyDef.userData = Detector.IDENTIFIER.PLAYER + '-' + this.id;

        this.body = world.CreateBody(bodyDef);

        var fixtureDef = new Box2D.Dynamics.b2FixtureDef();
        fixtureDef.density = Settings.PLAYER_DENSITY;
        fixtureDef.friction = 0;
        fixtureDef.restitution = Settings.PLAYER_RESTITUTION;

        var headShape = new Box2D.Collision.Shapes.b2CircleShape();
        headShape.SetRadius(5 / Settings.RATIO);
        headShape.SetLocalPosition(new Box2D.Common.Math.b2Vec2(0 / Settings.RATIO, -37 / Settings.RATIO));
        fixtureDef.shape = headShape;
        fixtureDef.isSensor = false;
        fixtureDef.userData = Detector.IDENTIFIER.PLAYER_HEAD;
        this.body.CreateFixture(fixtureDef);

        var bodyShape = new Box2D.Collision.Shapes.b2PolygonShape();
        bodyShape.SetAsOrientedBox(5 / Settings.RATIO, 16 / Settings.RATIO, new Box2D.Common.Math.b2Vec2(0 / Settings.RATIO, -21 / Settings.RATIO));
        fixtureDef.shape = bodyShape;
        fixtureDef.isSensor = false;
        fixtureDef.userData = Detector.IDENTIFIER.PLAYER_CHEST;
        this.body.CreateFixture(fixtureDef);

        var legsShape = new Box2D.Collision.Shapes.b2CircleShape();
        legsShape.SetRadius(5 / Settings.RATIO);
        legsShape.SetLocalPosition(new Box2D.Common.Math.b2Vec2(0 / Settings.RATIO, -5 / Settings.RATIO));
        fixtureDef.shape = legsShape;
        fixtureDef.friction = Settings.PLAYER_FRICTION;
        fixtureDef.isSensor = false;
        fixtureDef.userData = Detector.IDENTIFIER.PLAYER_LEGS;

        this.legs = this.body.CreateFixture(fixtureDef);

        var feetShape = new Box2D.Collision.Shapes.b2CircleShape();
        feetShape.SetRadius(4 / Settings.RATIO);
        feetShape.SetLocalPosition(new Box2D.Common.Math.b2Vec2(0 / Settings.RATIO, 0 / Settings.RATIO));
        fixtureDef.shape = feetShape;
        fixtureDef.isSensor = true;
        fixtureDef.userData = Detector.IDENTIFIER.FOOTSENSOR;
        this.body.CreateFixture(fixtureDef);

        this.body.SetActive(false);
    }