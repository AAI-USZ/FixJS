function () {
        var s = cc.Director.sharedDirector().getWinSize();
        var particleSystem = this.getChildByTag(TAG_PARTICLE_SYSTEM);

        // duration
        particleSystem.setDuration(-1);

        // gravity
        particleSystem.setGravity(cc.ccp(0, -90));

        // angle
        particleSystem.setAngle(90);
        particleSystem.setAngleVar(0);

        // radial
        particleSystem.setRadialAccel(0);
        particleSystem.setRadialAccelVar(0);

        // speed of particles
        particleSystem.setSpeed(180);
        particleSystem.setSpeedVar(50);

        // emitter position
        particleSystem.setPosition(cc.ccp(s.width / 2, 100));
        particleSystem.setPosVar(cc.ccp(s.width / 2, 0));

        // life of particles
        particleSystem.setLife(2.0);
        particleSystem.setLifeVar(1);

        // emits per frame
        particleSystem.setEmissionRate(particleSystem.getTotalParticles() / particleSystem.getLife());

        // color of particles
        var startColor = new cc.Color4F(0.5, 0.5, 0.5, 1.0);
        particleSystem.setStartColor(startColor);

        var startColorVar = new cc.Color4F(0.5, 0.5, 0.5, 1.0);
        particleSystem.setStartColorVar(startColorVar);

        var endColor = new cc.Color4F(0.1, 0.1, 0.1, 0.2);
        particleSystem.setEndColor(endColor);

        var endColorVar = new cc.Color4F(0.1, 0.1, 0.1, 0.2);
        particleSystem.setEndColorVar(endColorVar);

        // size, in pixels
        particleSystem.setEndSize(8.0);
        particleSystem.setStartSize(8.0);
        particleSystem.setEndSizeVar(0);
        particleSystem.setStartSizeVar(0);

        // additive
        particleSystem.setBlendAdditive(false);
    }