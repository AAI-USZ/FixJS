function () {
        this._super();

        this.setColor(cc.BLACK());
        this.removeChild(this._background, true);
        this._background = null;

        this._emitter = new cc.ParticleSystemQuad();
        this._emitter.initWithTotalParticles(100);
        this.addChild(this._emitter, 10);
        this._emitter.setTexture(cc.TextureCache.sharedTextureCache().addImage(s_fire));
        this._emitter.setShapeType(cc.PARTICLE_BALL_SHAPE);
        // duration
        this._emitter.setDuration(cc.CCPARTICLE_DURATION_INFINITY);

        // radius mode
        //this._emitter.setEmitterMode(cc.CCPARTICLE_MODE_RADIUS);

        // radius mode: start and end radius in pixels
        this._emitter.setStartRadius(50);
        this._emitter.setStartRadiusVar(0);
        this._emitter.setEndRadius(cc.CCPARTICLE_START_RADIUS_EQUAL_TO_END_RADIUS);
        this._emitter.setEndRadiusVar(0);

        // radius mode: degrees per second
        this._emitter.setRotatePerSecond(0);
        this._emitter.setRotatePerSecondVar(0);


        // angle
        this._emitter.setAngle(90);
        this._emitter.setAngleVar(0);

        // emitter position
        var size = cc.Director.sharedDirector().getWinSize();
        this._emitter.setPosition(cc.ccp(size.width / 2, size.height / 2));
        this._emitter.setPosVar(cc.PointZero());

        // life of particles
        this._emitter.setLife(5);
        this._emitter.setLifeVar(0);

        // spin of particles
        this._emitter.setStartSpin(0);
        this._emitter.setStartSpinVar(0);
        this._emitter.setEndSpin(0);
        this._emitter.setEndSpinVar(0);

        // color of particles
        var startColor = new cc.Color4F(0.5, 0.5, 0.5, 1.0);
        this._emitter.setStartColor(startColor);

        var startColorVar = new cc.Color4F(0.5, 0.5, 0.5, 1.0);
        this._emitter.setStartColorVar(startColorVar);

        var endColor = new cc.Color4F(0.1, 0.1, 0.1, 0.2);
        this._emitter.setEndColor(endColor);

        var endColorVar = new cc.Color4F(0.1, 0.1, 0.1, 0.2);
        this._emitter.setEndColorVar(endColorVar);

        // size, in pixels
        this._emitter.setStartSize(16);
        this._emitter.setStartSizeVar(0);
        this._emitter.setEndSize(cc.CCPARTICLE_START_SIZE_EQUAL_TO_END_SIZE);

        // emits per second
        this._emitter.setEmissionRate(this._emitter.getTotalParticles() / this._emitter.getLife());

        // additive
        this._emitter.setIsBlendAdditive(false);

        var rot = cc.RotateBy.create(16, 360);
        this._emitter.runAction(cc.RepeatForever.create(rot));
    }