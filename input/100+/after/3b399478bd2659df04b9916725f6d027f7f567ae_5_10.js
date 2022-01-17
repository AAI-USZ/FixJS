function (numberOfParticles) {
        if (this._super(numberOfParticles)) {
            // duration
            this._duration = cc.CCPARTICLE_DURATION_INFINITY;

            // set gravity mode.
            this._emitterMode = cc.CCPARTICLE_MODE_GRAVITY;

            // Gravity Mode: gravity
            this.modeA.gravity = cc.ccp(0, -1);

            // Gravity Mode: speed of particles
            this.modeA.speed = 5;
            this.modeA.speedVar = 1;

            // Gravity Mode: radial
            this.modeA.radialAccel = 0;
            this.modeA.radialAccelVar = 1;

            // Gravity mode: tagential
            this.modeA.tangentialAccel = 0;
            this.modeA.tangentialAccelVar = 1;

            // emitter position
            var winSize = cc.Director.sharedDirector().getWinSize();
            this.setPosition(cc.ccp(winSize.width / 2, winSize.height + 10));
            this._posVar = cc.ccp(winSize.width / 2, 0);

            // angle
            this._angle = -90;
            this._angleVar = 5;

            // life of particles
            this._life = 45;
            this._lifeVar = 15;

            // size, in pixels
            this._startSize = 10.0;
            this._startSizeVar = 5.0;
            this._endSize = cc.CCPARTICLE_START_SIZE_EQUAL_TO_END_SIZE;

            // emits per second
            this._emissionRate = 10;

            // color of particles
            this._startColor.r = 1.0;
            this._startColor.g = 1.0;
            this._startColor.b = 1.0;
            this._startColor.a = 1.0;
            this._startColorVar.r = 0.0;
            this._startColorVar.g = 0.0;
            this._startColorVar.b = 0.0;
            this._startColorVar.a = 0.0;
            this._endColor.r = 1.0;
            this._endColor.g = 1.0;
            this._endColor.b = 1.0;
            this._endColor.a = 0.0;
            this._endColorVar.r = 0.0;
            this._endColorVar.g = 0.0;
            this._endColorVar.b = 0.0;
            this._endColorVar.a = 0.0;

            // additive
            this.setBlendAdditive(false);
            return true;
        }
        return false;
    }