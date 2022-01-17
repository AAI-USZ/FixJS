function (particle) {
        // timeToLive
        // no negative life. prevent division by 0
        particle.timeToLive = this._life + this._lifeVar * cc.RANDOM_MINUS1_1();
        particle.timeToLive = Math.max(0, particle.timeToLive);

        // position
        particle.pos.x = this._sourcePosition.x + this._posVar.x * cc.RANDOM_MINUS1_1();
        particle.pos.y = this._sourcePosition.y + this._posVar.y * cc.RANDOM_MINUS1_1();

        // Color
        var start = new cc.Color4F(
            cc.clampf(this._startColor.r + this._startColorVar.r * cc.RANDOM_MINUS1_1(), 0, 1),
            cc.clampf(this._startColor.g + this._startColorVar.g * cc.RANDOM_MINUS1_1(), 0, 1),
            cc.clampf(this._startColor.b + this._startColorVar.b * cc.RANDOM_MINUS1_1(), 0, 1),
            cc.clampf(this._startColor.a + this._startColorVar.a * cc.RANDOM_MINUS1_1(), 0, 1)
        );

        var end = new cc.Color4F(
            cc.clampf(this._endColor.r + this._endColorVar.r * cc.RANDOM_MINUS1_1(), 0, 1),
            cc.clampf(this._endColor.g + this._endColorVar.g * cc.RANDOM_MINUS1_1(), 0, 1),
            cc.clampf(this._endColor.b + this._endColorVar.b * cc.RANDOM_MINUS1_1(), 0, 1),
            cc.clampf(this._endColor.a + this._endColorVar.a * cc.RANDOM_MINUS1_1(), 0, 1)
        );

        particle.color = start;
        particle.deltaColor.r = (end.r - start.r) / particle.timeToLive;
        particle.deltaColor.g = (end.g - start.g) / particle.timeToLive;
        particle.deltaColor.b = (end.b - start.b) / particle.timeToLive;
        particle.deltaColor.a = (end.a - start.a) / particle.timeToLive;

        // size
        var startS = this._startSize + this._startSizeVar * cc.RANDOM_MINUS1_1();
        startS = Math.max(0, startS); // No negative value

        particle.size = startS;

        if (this._endSize == cc.CCPARTICLE_START_SIZE_EQUAL_TO_END_SIZE) {
            particle.deltaSize = 0;
        } else {
            var endS = this._endSize + this._endSizeVar * cc.RANDOM_MINUS1_1();
            endS = Math.max(0, endS); // No negative values
            particle.deltaSize = (endS - startS) / particle.timeToLive;
        }

        // rotation
        var startA = this._startSpin + this._startSpinVar * cc.RANDOM_MINUS1_1();
        var endA = this._endSpin + this._endSpinVar * cc.RANDOM_MINUS1_1();
        particle.rotation = startA;
        particle.deltaRotation = (endA - startA) / particle.timeToLive;

        // position
        if (this._positionType == cc.CCPARTICLE_TYPE_FREE) {
            particle.startPos = this.convertToWorldSpace(cc.PointZero());

        } else if (this._positionType == cc.CCPARTICLE_TYPE_RELATIVE) {
            particle.startPos = this._position;
        }

        // direction
        var a = cc.DEGREES_TO_RADIANS(this._angle + this._angleVar * cc.RANDOM_MINUS1_1());

        // Mode Gravity: A
        if (this._emitterMode == cc.CCPARTICLE_MODE_GRAVITY) {
            var v = cc.ccp(Math.cos(a), Math.sin(a));
            var s = this.modeA.speed + this.modeA.speedVar * cc.RANDOM_MINUS1_1();

            // direction
            particle.modeA.dir = cc.ccpMult(v, s);

            // radial accel
            particle.modeA.radialAccel = this.modeA.radialAccel + this.modeA.radialAccelVar * cc.RANDOM_MINUS1_1();

            // tangential accel
            particle.modeA.tangentialAccel = this.modeA.tangentialAccel + this.modeA.tangentialAccelVar * cc.RANDOM_MINUS1_1();
        } else {
            // Mode Radius: B

            // Set the default diameter of the particle from the source position
            var startRadius = this.modeB.startRadius + this.modeB.startRadiusVar * cc.RANDOM_MINUS1_1();
            var endRadius = this.modeB.endRadius + this.modeB.endRadiusVar * cc.RANDOM_MINUS1_1();

            particle.modeB.radius = startRadius;

            if (this.modeB.endRadius == cc.CCPARTICLE_START_RADIUS_EQUAL_TO_END_RADIUS) {
                particle.modeB.deltaRadius = 0;
            } else {
                particle.modeB.deltaRadius = (endRadius - startRadius) / particle.timeToLive;
            }

            particle.modeB.angle = a;
            particle.modeB.degreesPerSecond = cc.DEGREES_TO_RADIANS(this.modeB.rotatePerSecond + this.modeB.rotatePerSecondVar * cc.RANDOM_MINUS1_1());
        }
    }