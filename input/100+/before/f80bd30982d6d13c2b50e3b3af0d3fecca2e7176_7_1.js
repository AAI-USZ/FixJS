function () {
        this.setIsTouchEnabled(true);
        //setIsAccelerometerEnabled( true );

        var b2Vec2 = Box2D.Common.Math.b2Vec2
            , b2BodyDef = Box2D.Dynamics.b2BodyDef
            , b2Body = Box2D.Dynamics.b2Body
            , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
            , b2World = Box2D.Dynamics.b2World
            , b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;

        var screenSize = cc.Director.sharedDirector().getWinSize();
        //UXLog(L"Screen width %0.2f screen height %0.2f",screenSize.width,screenSize.height);


        // Construct a world object, which will hold and simulate the rigid bodies.
        this.world = new b2World(new b2Vec2(0, 10), true);
        this.world.SetContinuousPhysics(true);

        // Define the ground body.
        //var groundBodyDef = new b2BodyDef(); // TODO
        //groundBodyDef.position.Set(screenSize.width / 2 / PTM_RATIO, screenSize.height / 2 / PTM_RATIO); // bottom-left corner

        // Call the body factory which allocates memory for the ground body
        // from a pool and creates the ground box shape (also from a pool).
        // The body is also added to the world.
        //var groundBody = this.world.CreateBody(groundBodyDef);

        var fixDef = new b2FixtureDef;
        fixDef.density = 1.0;
        fixDef.friction = 0.5;
        fixDef.restitution = 0.2;

        var bodyDef = new b2BodyDef;

        //create ground
        bodyDef.type = b2Body.b2_staticBody;
        fixDef.shape = new b2PolygonShape;
        fixDef.shape.SetAsBox(20, 2);
        // upper
        bodyDef.position.Set(10, screenSize.height / PTM_RATIO + 1.8);
        this.world.CreateBody(bodyDef).CreateFixture(fixDef);
        // bottom
        bodyDef.position.Set(10, -1.8);
        this.world.CreateBody(bodyDef).CreateFixture(fixDef);

        fixDef.shape.SetAsBox(2, 14);
        // left
        bodyDef.position.Set(-1.8, 13);
        this.world.CreateBody(bodyDef).CreateFixture(fixDef);
        // right
        bodyDef.position.Set(26.8, 13);
        this.world.CreateBody(bodyDef).CreateFixture(fixDef);

        //Set up sprite

        var mgr = cc.SpriteBatchNode.create(s_pathBlock, 150);
        this.addChild(mgr, 0, TAG_SPRITE_MANAGER);

        this.addNewSpriteWithCoords(cc.PointMake(screenSize.width / 2, screenSize.height / 2));

        var label = cc.LabelTTF.create("Tap screen", "Marker Felt", 32);
        this.addChild(label, 0);
        label.setColor(cc.ccc3(0, 0, 255));
        label.setPosition(cc.PointMake(screenSize.width / 2, screenSize.height - 50));

        this.scheduleUpdate();


    }