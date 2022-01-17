function (numberOfParticles) {
        this._totalParticles = numberOfParticles;

        this._particles = [];

        if (!this._particles) {
            cc.Log("Particle system: not enough memory");
            return false;
        }
        this._allocatedParticles = numberOfParticles;

        if (this._batchNode) {
            for (var i = 0; i < this._totalParticles; i++) {
                this._particles[i].atlasIndex = i;
            }
        }

        // default, active
        this._isActive = true;

        // default blend function
        this._blendFunc.src = cc.BLEND_SRC;
        this._blendFunc.dst = cc.BLEND_DST;

        // default movement type;
        this._positionType = cc.PARTICLE_TYPE_FREE;

        // by default be in mode A:
        this._emitterMode = cc.PARTICLE_MODE_GRAVITY;

        // default: modulate
        // XXX: not used
        //	colorModulate = YES;
        this._isAutoRemoveOnFinish = false;

        // Optimization: compile udpateParticle method
        //updateParticleSel = @selector(updateQuadWithParticle:newPosition:);
        //updateParticleImp = (CC_UPDATE_PARTICLE_IMP) [self methodForSelector:updateParticleSel];

        //for batchNode
        this._transformSystemDirty = false;

        // udpate after action in run!
        this.scheduleUpdateWithPriority(1);

        return true;
    }