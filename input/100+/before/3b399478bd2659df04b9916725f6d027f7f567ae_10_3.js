function () {
        this._super();

        //FIXME: If use CCParticleSystemPoint, bada 1.0 device will crash.
        //  Crash place: CCParticleSystemPoint.cpp Line 149, function: glDrawArrays(GL_POINTS, 0, this._particleIdx);
        //  this._emitter = new CCParticleSystemPoint();
        this._emitter = new cc.ParticleSystemQuad();
        //this._emitter.initWithTotalParticles(1000);
        this._emitter.initWithTotalParticles(200);
        //this._emitter.autorelease();

        this._background.addChild(this._emitter, 10);
        ////this._emitter.release();

        var s = cc.Director.sharedDirector().getWinSize();

        // duration
        this._emitter.setDuration(-1);

        // gravity
        this._emitter.setGravity(cc.PointMake(0, 0));

        // angle
        this._emitter.setAngle(0);
        this._emitter.setAngleVar(360);

        // radial
        this._emitter.setRadialAccel(70);
        this._emitter.setRadialAccelVar(10);

        // tagential
        this._emitter.setTangentialAccel(80);
        this._emitter.setTangentialAccelVar(0);

        // speed of particles
        this._emitter.setSpeed(50);
        this._emitter.setSpeedVar(10);

        // emitter position
        this._emitter.setPosition(cc.PointMake(s.width / 2, s.height / 2));
        this._emitter.setPosVar(cc.PointZero());

        // life of particles
        this._emitter.setLife(2.0);
        this._emitter.setLifeVar(0.3);

        // emits per frame
        this._emitter.setEmissionRate(this._emitter.getTotalParticles() / this._emitter.getLife());

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
        this._emitter.setStartSize(1.0);
        this._emitter.setStartSizeVar(1.0);
        this._emitter.setEndSize(32.0);
        this._emitter.setEndSizeVar(8.0);

        // texture
        this._emitter.setTexture(cc.TextureCache.sharedTextureCache().addImage(s_fire));
        this._emitter.setShapeType(cc.PARTICLE_BALL_SHAPE);
        // additive
        this._emitter.setIsBlendAdditive(false);

        this.setEmitterPosition();
    }