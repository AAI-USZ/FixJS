function () {
        this._super();

        this._emitter = new cc.ParticleSystemQuad();
        //this._emitter.initWithTotalParticles(300);
        this._emitter.initWithTotalParticles(150);

        this._background.addChild(this._emitter, 10);
        this._emitter.setTexture(cc.TextureCache.sharedTextureCache().addImage(s_stars2));
        this._emitter.setShapeType(cc.PARTICLE_STAR_SHAPE);
        // duration
        this._emitter.setDuration(-1);

        // gravity
        this._emitter.setGravity(cc.PointZero());

        // angle
        this._emitter.setAngle(90);
        this._emitter.setAngleVar(360);

        // speed of particles
        this._emitter.setSpeed(160);
        this._emitter.setSpeedVar(20);

        // radial
        this._emitter.setRadialAccel(-120);
        this._emitter.setRadialAccelVar(0);

        // tagential
        this._emitter.setTangentialAccel(30);
        this._emitter.setTangentialAccelVar(0);

        // emitter position
        this._emitter.setPosition(cc.PointMake(160, 240));
        this._emitter.setPosVar(cc.PointZero());

        // life of particles
        this._emitter.setLife(3);
        this._emitter.setLifeVar(1);

        // spin of particles
        this._emitter.setStartSpin(0);
        this._emitter.setStartSpinVar(0);
        this._emitter.setEndSpin(0);
        this._emitter.setEndSpinVar(2000);

        var startColor = new cc.Color4F(0.5, 0.5, 0.5, 1.0);
        this._emitter.setStartColor(startColor);

        var startColorVar = new cc.Color4F(0.5, 0.5, 0.5, 1.0);
        this._emitter.setStartColorVar(startColorVar);

        var endColor = new cc.Color4F(0.1, 0.1, 0.1, 0.2);
        this._emitter.setEndColor(endColor);

        var endColorVar = new cc.Color4F(0.1, 0.1, 0.1, 0.2);
        this._emitter.setEndColorVar(endColorVar);

        // size, in pixels
        this._emitter.setStartSize(30.0);
        this._emitter.setStartSizeVar(0);
        this._emitter.setEndSize(cc.PARTICLE_START_SIZE_EQUAL_TO_END_SIZE);

        // emits per second
        this._emitter.setEmissionRate(this._emitter.getTotalParticles() / this._emitter.getLife());

        // additive
        this._emitter.setBlendAdditive(false);

        this.setEmitterPosition();
    }