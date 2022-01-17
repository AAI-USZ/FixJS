function (numberOfParticles) {
        if (this._super(numberOfParticles)) {
            // duration
            this._duration = cc.CCPARTICLE_DURATION_INFINITY;

            // Gravity Mode
            this._emitterMode = cc.CCPARTICLE_MODE_GRAVITY;

            // Gravity Mode: gravity
            this.modeA.gravity = cc.ccp(0, 0);

            // Gravity Mode: radial acceleration
            this.modeA.radialAccel = 0;
            this.modeA.radialAccelVar = 0;

            // Gravity Mode: speed of particles
            this.modeA.speed = 60;
            this.modeA.speedVar = 20;

            // starting angle
            this._angle = 90;
            this._angleVar = 10;

            // emitter position
            var winSize = cc.Director.sharedDirector().getWinSize();
            this.setPosition(cc.ccp(winSize.width / 2, 60));
            this._posVar = cc.ccp(40, 20);

            // life of particles
            this._life = 3;
            this._lifeVar = 0.25;


            // size, in pixels
            this._startSize = 54.0;
            this._startSizeVar = 10.0;
            this._endSize = cc.CCPARTICLE_START_SIZE_EQUAL_TO_END_SIZE;

            // emits per frame
            this._emissionRate = this._totalParticles / this._life;

            // color of particles
            this._startColor.r = 0.76;
            this._startColor.g = 0.25;
            this._startColor.b = 0.12;
            this._startColor.a = 1.0;
            this._startColorVar.r = 0.0;
            this._startColorVar.g = 0.0;
            this._startColorVar.b = 0.0;
            this._startColorVar.a = 0.0;
            this._endColor.r = 0.0;
            this._endColor.g = 0.0;
            this._endColor.b = 0.0;
            this._endColor.a = 1.0;
            this._endColorVar.r = 0.0;
            this._endColorVar.g = 0.0;
            this._endColorVar.b = 0.0;
            this._endColorVar.a = 0.0;

            // additive
            this.setBlendAdditive(true);
            return true;
        }
        return false;
    }