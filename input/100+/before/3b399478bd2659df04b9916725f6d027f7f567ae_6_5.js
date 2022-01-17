function (dt) {
        if (this._isActive && this._emissionRate) {
            var rate = 1.0 / this._emissionRate;
            this._emitCounter += dt;
            while ((this._particleCount < this._totalParticles) && (this._emitCounter > rate)) {
                this.addParticle();
                this._emitCounter -= rate;
            }

            this._elapsed += dt;
            if (this._duration != -1 && this._duration < this._elapsed) {
                this.stopSystem();
            }
        }
        this._particleIdx = 0;

        /// @todo CCProfilingBeginTimingBlock(_profilingTimer);

        var currentPosition = cc.PointZero();
        if (this._positionType == cc.CCPARTICLE_TYPE_FREE) {
            currentPosition = this.convertToWorldSpace(cc.PointZero());
            currentPosition.x *= cc.CONTENT_SCALE_FACTOR();
            currentPosition.y *= cc.CONTENT_SCALE_FACTOR();
        } else if (this._positionType == cc.CCPARTICLE_TYPE_RELATIVE) {
            currentPosition = cc.ccp(this._position.x, this._position.y);
            currentPosition.x *= cc.CONTENT_SCALE_FACTOR();
            currentPosition.y *= cc.CONTENT_SCALE_FACTOR();
        }

        while (this._particleIdx < this._particleCount) {
            var selParticle = this._particles[this._particleIdx];

            // life
            selParticle.timeToLive -= dt;

            if (selParticle.timeToLive > 0) {
                // Mode A: gravity, direction, tangential accel & radial accel
                if (this._emitterMode == cc.CCPARTICLE_MODE_GRAVITY) {
                    var tmp, radial, tangential;

                    radial = cc.PointZero();
                    // radial acceleration
                    if (selParticle.pos.x || selParticle.pos.y)
                        radial = cc.ccpNormalize(selParticle.pos);
                    tangential = radial;
                    radial = cc.ccpMult(radial, selParticle.modeA.radialAccel);

                    // tangential acceleration
                    var newy = tangential.x;
                    tangential.x = -tangential.y;
                    tangential.y = newy;
                    tangential = cc.ccpMult(tangential, selParticle.modeA.tangentialAccel);

                    // (gravity + radial + tangential) * dt
                    tmp = cc.ccpAdd(cc.ccpAdd(radial, tangential), this.modeA.gravity);
                    tmp = cc.ccpMult(tmp, dt);
                    selParticle.modeA.dir = cc.ccpAdd(selParticle.modeA.dir, tmp);
                    tmp = cc.ccpMult(selParticle.modeA.dir, dt);
                    selParticle.pos = cc.ccpAdd(selParticle.pos, tmp);
                } else {
                    // Mode B: radius movement

                    // Update the angle and radius of the particle.
                    selParticle.modeB.angle += selParticle.modeB.degreesPerSecond * dt;
                    selParticle.modeB.radius += selParticle.modeB.deltaRadius * dt;

                    selParticle.pos.x = -Math.cos(selParticle.modeB.angle) * selParticle.modeB.radius;
                    selParticle.pos.y = -Math.sin(selParticle.modeB.angle) * selParticle.modeB.radius;
                }

                // color
                selParticle.color.r += (selParticle.deltaColor.r * dt);
                selParticle.color.g += (selParticle.deltaColor.g * dt);
                selParticle.color.b += (selParticle.deltaColor.b * dt);
                selParticle.color.a += (selParticle.deltaColor.a * dt);
                selParticle.isChangeColor = true;

                // size
                selParticle.size += (selParticle.deltaSize * dt);
                selParticle.size = Math.max(0, selParticle.size);

                // angle
                selParticle.rotation += (selParticle.deltaRotation * dt);

                //
                // update values in quad
                //
                var newPos;
                if (this._positionType == cc.CCPARTICLE_TYPE_FREE || this._positionType == cc.CCPARTICLE_TYPE_RELATIVE) {
                    var diff = cc.ccpSub(currentPosition, selParticle.startPos);
                    newPos = cc.ccpSub(selParticle.pos, diff);
                } else {
                    newPos = selParticle.pos;
                }

                if (cc.renderContextType == cc.WEBGL) {
                    this.updateQuadWithParticle(selParticle, newPos);
                } else {
                    selParticle.drawPos = newPos;
                }
                //updateParticleImp(self, updateParticleSel, p, newPos);

                // update particle counter
                ++this._particleIdx;
            } else {
                // life < 0
                cc.ArrayRemoveObject(this._particles, selParticle);

                --this._particleCount;

                if (this._particleCount == 0 && this._isAutoRemoveOnFinish) {
                    this.unscheduleUpdate();
                    this._parent.removeChild(this, true);
                    return;
                }
            }
        }

        /// @todo CCProfilingEndTimingBlock(_profilingTimer);

        if (cc.USES_VBO)
            this.postStep();
    }